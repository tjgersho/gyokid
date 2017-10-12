import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';

import { Device } from './Device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  @Input() device: Device;


  @Output() deviceSelected =  new EventEmitter<Device>();
  @Output() removeDevice = new EventEmitter<Device>();


  constructor() { }

  ngOnInit() {
  }

  addDeviceMonitor(){
	console.log('Add this device to monitor');
	this.deviceSelected.emit(this.device);
  }


  removeDeviceMonitor(){

	console.log('Remove this Device');
	this.removeDevice.emit(this.device);
  }


}
