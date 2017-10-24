import { Component, OnInit } from '@angular/core';
import { Device } from '../tracker/device/device.model';
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

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
  }


 addToDeviceRegistration(){

	console.log('imei..');
	console.log(this.imeinumber);
	this.newlyRegisteredDevices.push(new Device(this.imeinumber));

  this.user.devices.push(new Device(this.imeinumber));

     // this.router.navigate(['/dashboard']);


  }

 

 getDevRegistrationStatusImage(){	
    return 'assets/loader.gif';
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
			  self.newlyRegisteredDevices.push(new Device(imeiarray[i]));
        self.user.devices.push(new Device(imeiarray[i]));
		  }

        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(input.files[0]);
      };
 	

      input.addEventListener('change', readFile);

   }



}
