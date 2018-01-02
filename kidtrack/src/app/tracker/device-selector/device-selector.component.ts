import { Component, OnInit , Output, EventEmitter} from '@angular/core';

import { UserService } from '../../services/user.service';

import { Device } from '../../models/device.model';

import { GlobalService } from '../../services/global.service';

import { Router } from '@angular/router';

import { DeviceService } from '../../services/device.service';


@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.css']
})
export class DeviceSelectorComponent implements OnInit {

  @Output() onTrackGo = new EventEmitter<null>();


  formCenter = 0;

   editTagBooleanArray: boolean[];

  constructor(public user: UserService, private global: GlobalService, private router: Router, private deviceService: DeviceService) { }

  ngOnInit() {


   	this.formCenter = this.calculateFormCenter();

	this.global.onWindowChange.subscribe((data: object) => {
		//console.log('Global on window Change  - observable subscribe');
		//console.log(data);
		this.formCenter = this.calculateFormCenter();
	});

  }

   calculateFormCenter(){
	let offset = (this.global.screenHeight - 200) / 2 - 70;
	if (offset < 0){
		offset = 0;
         }
	return offset;
  }


  onDeviceSelected(dev){

    //console.log('onDevice Select');
	  //console.log(dev.tag);



	  this.deviceService.updateWatching(dev, this.user.token);

  }


  editTagClick(dev){

	if (dev.editTagBoolean){
		dev.editTagBoolean = false;
	}else{
	  	dev.editTagBoolean = true;
	}

  }

  blurEditTag(dev){
	dev.editTagBoolean = false;
  }

  removeDev(dev: Device){
        //console.log('Remove device selector');

        //console.log(dev);
        //this.user.deviceWatchingUpdate(dev);
	      this.deviceService.updateWatching(dev, this.user.token);

     }



  trackingAllStatusImg(){
	if (this.user.allDeviceWatching){
		return 'assets/signalon.png';
	}else{
		return 'assets/signaloff.png';
	}
   }

   onTrackStatusToggleALL(){

	let watchingStatus = false;
	if (this.user.allDeviceWatching){
		watchingStatus = false;
		this.user.allDeviceWatching = false;

	}else{
		watchingStatus = true;
		this.user.allDeviceWatching = true;
	}

	for (let i = 0; i < this.user.devices.length; i++){

		if (this.user.devices[i].watching && watchingStatus){

			 this.user.devices[i].watching = false;
		 }

		 if (!this.user.devices[i].watching && !watchingStatus){

			 this.user.devices[i].watching = true;
		 }

		this.deviceService.updateWatching(this.user.devices[i], this.user.token);

	}


  }

  goTrack(){
	     this.onTrackGo.emit();
  }

  cancelTrack(){
       this.router.navigate(['dashboard']);

  }

}
