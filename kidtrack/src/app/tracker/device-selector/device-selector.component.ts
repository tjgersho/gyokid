import { Component, OnInit , Output, EventEmitter} from '@angular/core';

import { UserService } from '../../services/user.service';

import { Device } from '../../models/device.model';

import { GlobalService } from '../../services/global.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.css']
})
export class DeviceSelectorComponent implements OnInit {

  @Output() onTrackGo = new EventEmitter<null>();


  formCenter: number = 0;

  constructor(private user: UserService, private global: GlobalService, private router: Router) { }

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


  onDeviceSelected(dev, tagVal, index){

      	console.log('onDevice Select');
	console.log(tagVal);


	dev.watching = true;
	dev.tag = tagVal;
	
	this.user.deviceWatchingUpdate(dev);

  }


  removeDev(dev){
        dev.watching = false;
	dev.tag = '';

        //this.user.deviceWatchingUpdate(dev);

	dev.updateWatching();
     }


  goTrack(){
	this.onTrackGo.emit();
  }

  cancelTrack(){
     this.router.navigate(['dashboard']);

  }

}
