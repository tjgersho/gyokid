import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Http, RequestOptions, Headers } from '@angular/http';

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
  ktcnumber: string = ""
  regstatustooltip: string = '';
  constructor(private router: Router, private user: UserService, private http: Http) { }

  ngOnInit() {
 
  }

  setRegistrationToolTip(status){
       if(status === 0){

    return "Checking the registration... Please wait.";

  }else if(status === 1){
     return "Registration Successfull! Device is now be available for tracking. Make sure your device is turned on.";

  }else{
     return "Registration Failed. Double check your IMEI number.  You can also only register a device once.";
  }
  }

  refreshToolTip(){
	setTimeout(function(){
   		 $('[data-toggle="tooltip"]').tooltip();

	},1000);
    
  }


 pushDeviceOnArrays(imei: string){

   var regDev = new Device()
	regDev.imei = imei;

   regDev.registrationOk = 0;

   regDev.regstatustooltip = this.setRegistrationToolTip(0);

   this.newlyRegisteredDevices.push(regDev);
   
   return this.newlyRegisteredDevices.length-1;

 }


 callServerForRegistration(imei: string, ktc: string){

  var regStatus = 0;
 	
     var index = this.pushDeviceOnArrays(imei);

     let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
     let options = new RequestOptions({ headers: headers });

	var data = {imei: imei, ktc: ktc};

	this.http.post('/api/v1/register-device', data, options).subscribe((resp) => {
		console.log('Device Registration Resp');
		console.log(resp);

		this.newlyRegisteredDevices[index].registrationOk = 1;
		this.newlyRegisteredDevices[index].regstatustooltip = this.setRegistrationToolTip(1);
 	this.refreshToolTip()

	},(err)=>{ 

 		console.log('Device Registration Resp ERR');
		console.log(err);
		
		this.newlyRegisteredDevices[index].registrationOk = 2;
		this.newlyRegisteredDevices[index].regstatustooltip = this.setRegistrationToolTip(2);
             this.refreshToolTip()

	},() => {

		console.log('Device Registration DONE');
		

	});

     this.refreshToolTip();

 }

 addToDeviceRegistration(){

	console.log('imei..');
	console.log(this.imeinumber);
	console.log(this.ktcnumber);

	this.callServerForRegistration(this.imeinumber, this.ktcnumber);

    
  }



registerFormOk(){
  var imeiNum = this.imeinumber.toString();
  var ktcNum = this.ktcnumber.toString();
 return imeiNum === '' || imeiNum.length < 15 || ktcNum.length !== 3;

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

			var imeiandktc = imeiarray[i].split(',');
			console.log('IMEI');
			console.log(imeiandktc[0]);
			console.log('KTC');
			console.log(imeiandktc[1]);


			self.callServerForRegistration(imeiandktc[0], imeiandktc[1].substring(0, 3));



		  }

        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(input.files[0]);
      };
 	

      input.addEventListener('change', readFile);

   }



}
