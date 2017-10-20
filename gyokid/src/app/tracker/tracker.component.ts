import { Component, OnInit } from '@angular/core';

import { Device } from './device/device.model';

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

  deviceTrackerList: Device[];
  showDeviceSelector: boolean = true;

  constructor(private user: UserService, private router:Router) {

	if(!user.isLoggedIn){
 	  router.navigate(['/']);
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


       devicesSelected(list){
	console.log('In tracker Compoent and devicesSelected');
	console.log(list);

	this.deviceTrackerList = list;

         this.showDeviceSelector = false;
       }
	
       cancelDeviceSelection(obj){
         console.log('In tracker on cancel device select.');
	 console.log(obj);
          this.showDeviceSelector = false;

      }

}






