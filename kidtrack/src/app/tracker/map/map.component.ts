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


  constructor(private user: UserService, private deviceService: DeviceService) { }

  ngOnInit() {      
	
   this.initializeMap().then(function(resp){


    this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: {lat: 100, lng: 80}
        });
        this.marker = new google.maps.Marker({
          position: this.user.devices[0].gpsdata[0].location,
          icon: "assets/kidtrackmapicon.png",
          map: this.map,
	        draggable: false,
          animation: google.maps.Animation.DROP,
	  title: this.user.devices[0].tag
        });

 	 this.marker.addListener('click', this.toggleBounce.bind(this));

         this.timer = setInterval(()=>{

        this.runShit();

     },3000);

    },function(err){

		console.log('Err initializing map');
		console.log(err);

	});

  }

  initializeMap(){
	return new Promise(function(resolve, reject){
		resolve();

	});

   }



  toggleBounce() {
    if (this.marker.getAnimation() !== null) {
       this.marker.setAnimation(null);
    } else {
       this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  

  runShit(){
    console.log("RUNNING SHIT");
    let newLocationTest = this.deviceService.resetGpsDataZeroforTest();
    console.log(newLocationTest);
    this.marker.setPosition(newLocationTest);
    this.map.setCenter(newLocationTest);

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
