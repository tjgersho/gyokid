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
  runMap: boolean = false;
  
  constructor(private user: UserService, private router:Router) {


	console.log('Tracker constructor');
	console.log('Tracker constructor');

	if(user.devices.length < 1){
 	  router.navigate(['/dashboard']);
        }

	

	if(user.userHasTrakingDevices()){
		this.showDeviceSelector = false;
		this.runMap = true;
		user.getAllDeviceGpsData();
	}else{

		this.showDeviceSelector = true;
		this.runMap = false;
	}

	
   }

  ngOnInit() {}

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
	 this.runMap = true;
       }
	
       cancelDeviceSelection(obj){
         console.log('In tracker on cancel device select.');
	 console.log(obj);
          this.showDeviceSelector = false;
	   this.runMap = false;

      }

}






