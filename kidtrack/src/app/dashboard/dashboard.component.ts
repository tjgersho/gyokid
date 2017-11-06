import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

import { GlobalService } from '../services/global.service';

import { TruncatePipe } from '../truncate.pipe';

import { Device } from '../models/device.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  regDeviceAccordOpen: boolean = true;
  dataCredAccordOpen: boolean = true;

  constructor(private user: UserService, private global: GlobalService) {
		if(user.pingCredits < 1){
			this.regDeviceAccordOpen = false;
		}

		if(user.pingCredits > 1000){
			 this.dataCredAccordOpen = false;
		}
	
	 }

  ngOnInit() {
  }


 accordOpenCloseButton(){
	if(this.regDeviceAccordOpen){
		return {'glyphicon-minus': true};
	}else{
		return {'glyphicon-plus': true};
	}	
	
 }

 accordOpenClose(){
	
	if(this.regDeviceAccordOpen){
		return {'in': true};
	}else{
		return {'in': false};
	}	
 }

 openCloseDeviceAccordian(){
	this.regDeviceAccordOpen?this.regDeviceAccordOpen=false:this.regDeviceAccordOpen=true;
  }


 
 dataCredAccordOpenCloseButton(){
	if(this.dataCredAccordOpen){
		return {'glyphicon-minus': true};
	}else{
		return {'glyphicon-plus': true};
	}	
	
 }

 dataCredAccordOpenClose(){
	
	if(this.dataCredAccordOpen){
		return {'in': true};
	}else{
		return {'in': false};
	}	
 }

 dataCredOpenCloseDeviceAccordian(){
	this.dataCredAccordOpen?this.dataCredAccordOpen=false:this.dataCredAccordOpen=true;
  }


 trackingStatusImg(bool:boolean){
	if(bool){
		return 'assets/signalon.png';
	}else{
		return 'assets/signaloff.png';
	}
 }


 onTagChange(dev: Device){
	console.log('ON device tag change, input blur');
	console.log(dev);
	///Update Model////
	
 }

 onTrackStatusToggle(dev: Device){
	dev.updateWatching();


 }


}
