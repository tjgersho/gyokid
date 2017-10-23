import { Component, OnInit } from '@angular/core';
import { Device } from '../tracker/device/device.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.css']
})
export class RegisterDeviceComponent implements OnInit {

  
  newlyRegisteredDevices: Device[] = [];
  imeinumber:string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }


 addToDeviceRegistration(){

	console.log('imei..');
	console.log(this.imeinumber);
	this.newlyRegisteredDevices.push(new Device(this.imeinumber));

     // this.router.navigate(['/dashboard']);


  }


getDevRegistrationStatusImage(){
	
	return 'assets/loader.gif';


}



}
