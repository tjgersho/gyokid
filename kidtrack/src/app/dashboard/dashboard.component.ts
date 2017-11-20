import { Component, OnInit , OnDestroy} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


import { UserService } from '../services/user.service';

import { GlobalService } from '../services/global.service';

import { TruncatePipe } from '../truncate.pipe';

import { Device } from '../models/device.model';

import { DeviceService } from '../services/device.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  regDeviceAccordOpen: boolean = true;
  dataCredAccordOpen: boolean = true;
  timer: any;

  constructor(private user: UserService, private global: GlobalService, private deviceService: DeviceService, private router: Router) {
		if(user.pingCredits < 1){
			this.regDeviceAccordOpen = false;
		}

		if(user.pingCredits > 1000){
			 this.dataCredAccordOpen = false;
		}
	
	 }

  ngOnInit() {

	this.timer = setInterval(this.refreshData.bind(this), 10000);
  }



 refreshData(){
	console.log('Refresh data - This:');
	console.log(this);

	this.user.refreshData().then((resp) => {
		console.log('User Refresh complete');
		console.log(resp);

		}, (err) => {
		 console.log('User Refresh complete ERR');
		 console.log(err);

		});


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
	this.deviceService.updateTag(dev, this.user.token);
	
 }

 onTrackStatusToggle(dev: Device){
	this.deviceService.updateWatching(dev, this.user.token);


 }

 goToTrack(){

	if(this.user.pingCredits > 0){
		this.router.navigate(['/tracker']);
	}
  }

  ngOnDestroy(){
	console.log('ON DESTROY DashBoard BABY');

    clearInterval(this.timer);

  }


}
