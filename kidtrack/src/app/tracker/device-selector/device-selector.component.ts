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


  formCenter: number = 0;
 
   editTagBooleanArray: boolean[];
  
  constructor(private user: UserService, private global: GlobalService, private router: Router, private deviceService: DeviceService) { }

  ngOnInit() {


   	this.formCenter = this.calculateFormCenter();

	this.global.onWindowChange.subscribe((data: object) => {
		console.log('Global on window Change  - observable subscribe');
		console.log(data);
		this.formCenter = this.calculateFormCenter();
	});
	
  }

   calculateFormCenter(){
	var offset = (this.global.screenHeight-200)/2 - 70;
	if(offset < 0){
		offset = 0;
         }
	return offset;
  }


  onDeviceSelected(dev){

    console.log('onDevice Select');
	  console.log(dev.tag);


	
	  this.deviceService.updateWatching(dev, this.user.token);

  }


  editTagClick(dev){
	
	if(dev.editTagBoolean){
		dev.editTagBoolean = false;
	}else{
	  	dev.editTagBoolean = true;
	}

  }

  blurEditTag(dev){
	dev.editTagBoolean = false;
  }

  removeDev(dev: Device){
        console.log('Remove device selector');
        
        console.log(dev);
        //this.user.deviceWatchingUpdate(dev);
	      this.deviceService.updateWatching(dev, this.user.token);

     }


  goTrack(){
	     this.onTrackGo.emit();
  }

  cancelTrack(){
       this.router.navigate(['dashboard']);

  }

}
