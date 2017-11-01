import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.css']
})
export class RegisterDeviceComponent implements OnInit {

  
  newlyRegisteredDevices: Device[] = [];
  imeinumber:string = '';
  regstatustooltip: string = '';
  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
 
  }

  setRegistrationToolTip(status){
       if(status === 0){

    return "Checking the registration... Please wait.";

  }else if(status === 1){
     return "Registration Successfull! Device should now be available for tracking.";

  }else{
     return "Registration Failed. Double check your IMEI number.  You can also only register a device once.";
  }
  }

  refreshToolTip(){
        $('[data-toggle="tooltip"]').tooltip();
  }

 pushDeviceOnArrays(imei: string){


   var regDev = new Device(imei)

   regDev.registrationOk =   (Math.floor(Math.random()*3));
   regDev.regstatustooltip = this.setRegistrationToolTip(regDev.registrationOk);

   this.newlyRegisteredDevices.push(regDev);

   if(regDev.registrationOk === 1){
     var devicepush = new Device(imei);
     this.user.devices.push(devicepush);
   }

   var self = this;
   setTimeout(function(){
     self.refreshToolTip();
   }, 200);
 }

 addToDeviceRegistration(){

	console.log('imei..');
	console.log(this.imeinumber);
 
  this.pushDeviceOnArrays(this.imeinumber);

  }

  

 getDevRegistrationStatusImage(dev: Device){	

   
   if(dev.registrationOk === 0){

    return 'assets/loader.gif';

  }else if(dev.registrationOk === 1){
     return 'assets/check.png';

  }else{
     return 'assets/x.png';
  }

 }



getDevRegistrationWordClass(dev: Device){

  if(dev.registrationOk === 0){

   return {'regPend': true};

  }else if(dev.registrationOk === 1){
    return {'regOk': true, 'regPend': false};

  }else{
    return {'regFail': true, 'regPend': false};
  }


}


 

	
  uploadCSV(){
       var input=document.createElement('input');
           input.type="file";
	      input.style.display = 'none';

           $('body').append(input);

	    $(input).click();

	   var self = this;

     var readFile = function() {
        var reader = new FileReader();
        reader.onload = function () {

		console.log(reader.result);

		var imeiarray = reader.result.split("\n");
    if(imeiarray[imeiarray.length-1] === ""){
       imeiarray.pop();
    }
	
		console.log(imeiarray);
		  for(var i=0; i<imeiarray.length; i++){
        self.pushDeviceOnArrays(imeiarray[i]);
		  }

        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(input.files[0]);
      };
 	

      input.addEventListener('change', readFile);

   }



}
