import { Component, OnInit , Output, EventEmitter} from '@angular/core';

import { UserService } from '../../services/user.service';

import { Device } from '../device/device.model';

import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-device-selector',
  templateUrl: './device-selector.component.html',
  styleUrls: ['./device-selector.component.css']
})
export class DeviceSelectorComponent implements OnInit {

  @Output() onTrackGo = new EventEmitter<null>();
  @Output() onTrackCancel = new EventEmitter<null>();

  formCenter: number = 0;

  constructor(private user: UserService, private global: GlobalService) { }

  ngOnInit() {


   	this.formCenter = this.calculateFormCenter();

	this.global.onWindowChange.subscribe((data: object) => {
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

        this.user.deviceWatchingUpdate(dev);


     }


  goTrack(){
	this.onTrackGo.emit();
  }

  cancelTrack(){
       this.onTrackCancel.emit();

  }

}
