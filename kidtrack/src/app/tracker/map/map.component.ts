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
  infowindows: object[] = [];
  watchingCount = 0;
  lonAv = 0;
  latAv = 0;
  minLat = 900;
  maxLat: number = -900;
  minLon = 900;
  maxLon: number = -900;
  timertimer: any;

  seconds = 100;
  loader: any;
  alpha = 0;
  pie: number = Math.PI;
  t: number = (this.seconds / 360 * 1000);


  constructor(private user: UserService, private deviceService: DeviceService) {


  }

  ngOnInit() {
	const self = this;

      this.loader = document.getElementById('loader');

    this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: {lat: 40, lng: -50}
        });

   this.initializeMap().then(function(resp){
	console.log('Self. Timer');
	console.log(self.timer);

     if (!self.timer){




    self.timer = setInterval(() => {

           self.gameloop();

         }, 10000);


      }


	setTimeout(() => {

      		  self.zoomInOnAverage();

            }, 2000);



	self.initializeMarkers();

	self.timertimer = setInterval(() => {

                 self.timerDraw();

           }, 100);



    }, function(err){

		console.log('Err initializing map');
		console.log(err);

	});


  }



  timerDraw() {

     this.alpha += 3.6;


     this.alpha %= 360;

  const r = ( this.alpha * this.pie / 180 );

    const x = Math.sin( r ) * 15;
   const y = Math.cos( r ) * - 15;
   const mid = ( this.alpha > 180 ) ? 1 : 0;


   const anim = 'M 0 0 v -15 A 15 15 1 '  + mid + ' 1 '  +  x  + ' '  +  y  + ' z';

     this.loader.setAttribute( 'd', anim );


  }


  initializeMap(){
	const self = this;

	return new Promise(function(resolve, reject){

		self.deviceService.getGpsData(self.user.devices, self.user.token).then(function(resp){
			console.log('Got GPS data.');
			console.log(resp);

				resolve();

		}, function(err){
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
	for (let i = 0; i < this.user.devices.length; i++){
		if (this.user.devices[i].watching && this.user.devices[i].gpsdata[0]){

			console.log(this.user.devices[i].tag);
			console.log(this.user.devices[i].gpsdata[0].location.lat);

			const loc = this.user.devices[i].gpsdata[0].location;

		         this.latAv = this.latAv + loc.lat;
		         this.lonAv = this.lonAv + loc.lng;

			if (loc.lat < this.minLat){

				this.minLat = loc.lat;
			}
			if (loc.lat >  this.maxLat){

				this.maxLat = loc.lat;
			}

			if (loc.lng < this.minLon){

				this.minLon = loc.lng;
			}

			if (loc.lng > this.maxLon){

				this.maxLon = loc.lng;
			}

			this.watchingCount = this.watchingCount + 1;
		}

	}

         const viewPortDiff = (this.maxLon - this.minLon) >  (this.maxLat - this.minLat) ? (this.maxLon - this.minLon) : (this.maxLat - this.minLat);

	console.log('View Port Dif');
	console.log(viewPortDiff);


      this.latAv = this.latAv / this.watchingCount;
      this.lonAv = this.lonAv / this.watchingCount;


	this.map.setCenter({lat: this.latAv, lng: this.lonAv});

	const newZoom = 2;

	switch (true) {

		case (viewPortDiff >= 100): {
			const newZoom = 3;
		     break;
		}
		case (viewPortDiff < 100 && viewPortDiff >= 50): {
			const newZoom = 5;
		     break;
		}
		case (viewPortDiff < 50 && viewPortDiff >= 20): {
			const newZoom = 7;
		     break;
		}
		case (viewPortDiff < 20 && viewPortDiff >= 5): {
			const newZoom = 8;
		     break;
		}
		case (viewPortDiff < 5 && viewPortDiff >= 1): {
			const newZoom = 10;
		     break;
		}
		case (viewPortDiff < 1 && viewPortDiff >= 0.5): {
			const newZoom = 11;
		     break;
		}
		case (viewPortDiff < 0.5 && viewPortDiff >= 0.1): {
			const newZoom = 12;
		     break;
		}
		case (viewPortDiff < 0.1 && viewPortDiff >= 0.01): {
			const newZoom = 13;
		     break;
		}
		default: {
		    const newZoom = 15;
		  break;
		}
	}
		console.log('New Zoom');
		console.log(newZoom);

	 this.map.setZoom(newZoom);

  }

   initializeMarkers(){

   	const self = this;

	console.log('Draw Markers..');
	console.log(this);

	for ( let i = 0; i < this.user.devices.length; i++){
	 if (this.user.devices[i].watching && this.user.devices[i].gpsdata[0]){


		///SET NEW MARKER OBJECT in array..

	   	this.markers.push({});
		const mkidx = this.markers.length - 1;

		this.markers[mkidx].deviceId = this.user.devices[i].id;
	        this.markers[mkidx].alarm = this.user.devices[i].alarm;

           let deviceTag = '';
	   if (this.user.devices[0].tag !== null && this.user.devices[0].tag !== undefined  && this.user.devices[0].tag !== ''){
	     deviceTag = '<p style="text-align:center;"><b>' + this.user.devices[i].tag + '</b></p>';

	      deviceTag += '<p>' + this.user.devices[i].gpsdata[0].timestamp + '</p>';


	    }else{
		 deviceTag = '';
	     	 deviceTag += '<p>' + this.user.devices[i].gpsdata[0].timestamp + '</p>';
	    }

	const infowindow = new google.maps.InfoWindow({content: deviceTag});




	let iconImg = 'assets/kidtrackmapicon.png';

	if (this.user.devices[i].alarm){
		iconImg = 'assets/kidtrackmapiconAlarm.png';
		deviceTag += '<p style="color:red;">Alarm has been triggered!</p>';

		infowindow.setContent(deviceTag);
	}

	this.markers[mkidx].infowindow = infowindow;

        const marker = new google.maps.Marker({
          position: this.user.devices[i].gpsdata[0].location,
          icon: iconImg,
          map: this.map,
	  draggable: false,
          animation: google.maps.Animation.DROP,
	  title: this.user.devices[i].tag
        });

	this.markers[mkidx].marker = marker;


 	this.markers[mkidx].marker.addListener('click', (function(marker, infowindow){


		return function(){

 	 	// This here is each device associated with this marker.. from the function binding..
  		  if (marker.getAnimation() !== null) {
     		     marker.setAnimation(null);
   		   } else {
   		       marker.setAnimation(google.maps.Animation.BOUNCE);
		        setTimeout(function(){
				marker.setAnimation(null);
			}, 2000);
    		   }


		   infowindow.open(self.map, marker);

		};


            })(marker, infowindow));


	 const lineCoordinates = [];

	for (let j = 0; j < this.user.devices[i].gpsdata.length; j++){

		lineCoordinates.push(this.user.devices[i].gpsdata[j].location);
	}


        const flightPath = new google.maps.Polyline({
          path: lineCoordinates,
          geodesic: true,
          strokeColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          strokeOpacity: 0.5,
          strokeWeight: 3
        });

        flightPath.setMap(this.map);

	 this.markers[mkidx].flightPath = flightPath;


	  } //Is watching..

	}//draw loop

   }





  gameloop(){
	console.log('GAME LOOP');
	const self = this;
	const watchingArray = [];
	for (let j = 0; j < this.user.devices.length; j++){

		if (this.user.devices[j].watching){
			watchingArray.push(this.user.devices[j]);
		}
	}
	this.deviceService.getGpsData(watchingArray, self.user.token).then(function(resp){
			console.log('Got GPS data.');
			console.log(resp);

		for (let k = 0; k < self.user.devices.length; k++){
		 if (self.user.devices[k].watching){

		  for (let i = 0; i < self.markers.length; i++){
			  console.log('Markers id');
			 console.log(self.markers[i].deviceId);
			  console.log('self.user.devices[k].id');
		         console.log(self.user.devices[k].id);
			    if (self.markers[i].deviceId === self.user.devices[k].id){

				self.markers[i].marker.setPosition(self.user.devices[k].gpsdata[0].location);


			       let deviceTag = '<p style="text-align:center;"><b>' + self.user.devices[k].tag + '</b></p>';

	   		        deviceTag += '<p>' + self.user.devices[k].gpsdata[0].timestamp + '</p>';

				self.markers[i].infowindow.setContent(deviceTag);

					if (self.user.devices[k].alarm){
						self.markers[i].alarm = true;
						const iconImg = 'assets/kidtrackmapiconAlarm.png';
						self.markers[i].marker.setIcon(iconImg);
						deviceTag = '<p style="text-align:center; color:red;"><b>' + self.user.devices[k].tag + '</b></p>';

	   		                        deviceTag += '<p  style="color:red;">' + self.user.devices[k].gpsdata[0].timestamp + '</p>';

						deviceTag += '<p style="color:red;">Alarm has been triggered!</p>';

						self.markers[i].infowindow.setContent(deviceTag);
					}else{
						self.markers[i].alarm = false;
						const iconImg = 'assets/kidtrackmapicon.png';

						self.markers[i].marker.setIcon(iconImg);

					}

				 const lineCoordinates = [];

				for (let j = 0; j < self.user.devices[k].gpsdata.length; j++){

				   lineCoordinates.push(self.user.devices[k].gpsdata[j].location);
				}


        			self.markers[i].flightPath.setPath(lineCoordinates);

			     }

      		   }
		 }
		}


		}, function(err){
				console.log('Didnt get GPS data....');
			console.log(err);

		});





  }

  clearMarkers() {
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
        this.markers = [];
   }

   clearAlarm(m){
	console.log('Clear Alarm');
	console.log(m);
	m.alarm = false;
	this.deviceService.clearAlarm(m.deviceId, this.user.token);

    }

  ngOnDestroy(){
	console.log('ON DESTROY MAP BABY');

    clearInterval(this.timer);
	clearInterval(this.timertimer);

  }

}
