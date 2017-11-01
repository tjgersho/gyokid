import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

declare var google: any;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  marker: any;
  

  constructor(private user: UserService) { }

  ngOnInit() {


        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: this.user.devices[0].gpsdata[0].location
        });
        this.marker = new google.maps.Marker({
          position: this.user.devices[0].gpsdata[0].location,
          icon: "assets/kidtrackmapicon.png",
          map: map,
	        draggable: false,
          animation: google.maps.Animation.DROP,
	  title: this.user.devices[0].tag
        });
 	  this.marker.addListener('click', this.toggleBounce);
  }


  toggleBounce() {
    if (this.marker.getAnimation() !== null) {
       this.marker.setAnimation(null);
    } else {
       this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  

}
