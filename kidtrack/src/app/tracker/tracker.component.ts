import { Component, OnInit } from '@angular/core';

import { Device } from '../models/device.model';

import { Router } from '@angular/router';
import { UserService } from '../services/user.service';



declare var jquery:any;
declare var $ :any;

import loadTouchEvents from 'jquery-touch-events';

loadTouchEvents($);

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  
  stateHover: string = ''

  showDeviceSelector: boolean = true;

  constructor(private user: UserService, private router:Router) {


	console.log('Tracker constructor');
	console.log('Tracker constructor');

	if(!user.isLoggedIn){
 	  router.navigate(['/']);
        }

	if(user.userHasTrakingDevices()){
		this.showDeviceSelector = false;

		user.getAllDeviceGpsData();
	}
   }

  ngOnInit() {
	


  }

 	resetDeviceList(){
	   console.log('Reset Device list');

             //this.deviceTrackerList = [];

             this.showDeviceSelector = true;
        }

      
       getServerData(){
	  console.log('Get Server Data');
          //Get server data based on device list//

	 
        }


       devicesSelected(){
	console.log('In tracker Compoent and devicesSelected');


         this.showDeviceSelector = false;
       }
	
       cancelDeviceSelection(obj){
         console.log('In tracker on cancel device select.');
	 console.log(obj);
          this.showDeviceSelector = false;

      }

}






