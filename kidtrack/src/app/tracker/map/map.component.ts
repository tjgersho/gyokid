import { Component, OnInit, OnDestroy} from '@angular/core';
import { UserService } from '../../services/user.service';
import { DeviceService } from '../../services/device.service';

declare var google: any;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  marker: any;
  map: any;
  timer: any;
  markers: any[] = [];
  infowindows: object[] = []
  watchingCount: number = 0;
  lonAv:number = 0;
  latAv:number = 0;
  minLat:number = 900;
  maxLat:number = -900;
  minLon:number = 900;
  maxLon:number = -900;

  constructor(private user: UserService, private deviceService: DeviceService) { 




  }

  ngOnInit() {      
	var self = this;

    this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: 40, lng: -50}
        });


   this.initializeMap().then(function(resp){


     self.timer = setInterval(()=>{

        self.gameloop();

     },10000);


	setTimeout(()=>{

      		  self.zoomInOnAverage();

            },2000);

	

	self.initializeMarkers();


    },function(err){

		console.log('Err initializing map');
		console.log(err);

	});

  }

  initializeMap(){
	var self = this;

	return new Promise(function(resolve, reject){

		self.deviceService.getGpsData(self.user.devices[0], self.user.token).then(function(resp){
			console.log('Got GPS data.');
			console.log(resp);

				resolve();

		},function(err){
				console.log('Didnt get GPS data....');
			console.log(err);
			reject();

		});

	

	});

   }


  zoomInOnAverage() {

	this.latAv = 0;
	this.lonAv = 0;
	this.minLat = 900;
	this.maxLat = -900;
	this.minLon = 900;
	this.maxLon = -900;

	this.watchingCount = 0;
	for(var i=0; i< this.user.devices.length; i++){
		if(this.user.devices[i].watching){
			
			console.log(this.user.devices[i].tag);
			console.log(this.user.devices[i].gpsdata[0].location.lat);
			
			var loc = this.user.devices[i].gpsdata[0].location;

		         this.latAv = this.latAv + loc.lat;
		         this.lonAv = this.lonAv + loc.lng;

			if(loc.lat < this.minLat){

				this.minLat = loc.lat;
			}
			if(loc.lat >  this.maxLat){

				this.maxLat = loc.lat;
			}

			if(loc.lng < this.minLon){

				this.minLon = loc.lng;
			}

			if(loc.lat > this.maxLon){

				this.maxLon = loc.lng;
			}

			this.watchingCount = this.watchingCount + 1;
		}

	}

         var viewPortDiff = (this.maxLon - this.minLon) >  (this.maxLat - this.minLat) ? (this.maxLon - this.minLon) : (this.maxLat - this.minLat);

	console.log('View Port Dif');
	console.log(viewPortDiff);


      this.latAv = this.latAv/this.watchingCount;
      this.lonAv = this.lonAv/this.watchingCount;
	

	this.map.setCenter({lat: this.latAv, lng: this.lonAv});
	
	var newZoom = 2;

	switch(true) {

		case (viewPortDiff > 100):{
			var newZoom = 3;
		     break;
		}
		case (viewPortDiff < 100 && viewPortDiff >= 50):{
			var newZoom = 5;
		     break;
		}
		case (viewPortDiff < 49 && viewPortDiff >= 20):{
			var newZoom = 7;
		     break;
		}
		case (viewPortDiff < 19 && viewPortDiff >= 10):{
			var newZoom = 11;
		     break;
		}
		case (viewPortDiff < 9 && viewPortDiff >= 4):{
			var newZoom = 13;
		     break;
		}
		default:{
		    var newZoom = 15;
		  break;
		}
	}

	 this.map.setZoom(newZoom);

  }

   initializeMarkers(){

   	var self = this;

	console.log('Draw Markers..');
	console.log(this);

	for( var i=0; i<this.user.devices.length; i++){
	 if(this.user.devices[i].watching){
	
	if(this.user.devices[0].tag !== null && this.user.devices[0].tag !== undefined  && this.user.devices[0].tag !== ''){
	  var deviceTag = '<p>' + this.user.devices[i].tag + '</p>';
	   deviceTag += '<p>' + this.user.devices[i].gpsdata[0].timestamp + '</p>';
	  var infowindow = new google.maps.InfoWindow({content: deviceTag});

	}
 	
	

        var marker = new google.maps.Marker({
          position: this.user.devices[i].gpsdata[0].location,
          icon: "assets/kidtrackmapicon.png",
          map: this.map,
	  draggable: false,
          animation: google.maps.Animation.DROP,
	  title: this.user.devices[i].tag
        });


 	 marker.addListener('click', function(){
		console.log('This in the listener');
		console.log(this);

  		 if (marker.getAnimation() !== null) {
     		     marker.setAnimation(null);
   		 } else {
   		     marker.setAnimation(google.maps.Animation.BOUNCE);
    		 }

		if(self.user.devices[i].tag !== null && self.user.devices[i].tag !== undefined  && self.user.devices[i].tag !== ''){
	
		  infowindow.open(self.map, marker);

		 }
            }.bind(devices[i]));

	    this.markers.push(marker);


	  } //Is watching..

	}//draw loop
 
   }
  

  gameloop(){
	console.log('GAME LOOP');

  //  var newLocationTest = this.deviceService.resetGpsDataZeroforTest(); 
   // this.marker.setPosition(newLocationTest);
   // this.map.setCenter(newLocationTest);

  }

  clearMarkers() {
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
        this.markers = [];
   }

  ngOnDestroy(){

    clearInterval(this.timer);

  }

}
