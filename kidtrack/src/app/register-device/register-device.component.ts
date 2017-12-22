import { Component, OnInit } from '@angular/core';
import { Device } from '../models/device.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Http, RequestOptions, Headers } from '@angular/http';

import { UserService } from '../services/user.service';

declare var jquery: any;
declare var $: any;



@Component({
  selector: 'app-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.css']
})
export class RegisterDeviceComponent implements OnInit {


  newlyRegisteredDevices: Device[] = [];
  imeinumber = '';
  ktcnumber = '';
  regstatustooltip = '';
  constructor(private router: Router, private user: UserService, private http: Http) { }

  ngOnInit() {

  }

  setRegistrationToolTip(status){
       if (status === 0){

    return 'Checking the registration... Please wait.';

  }else if (status === 1){
     return 'Registration Successfull! Device is now be available for tracking. Make sure your device is turned on.';

  }else{
     return 'Registration Failed. Double check your IMEI number.  You can also only register a device once.';
  }
  }

  refreshToolTip(){
	setTimeout(function(){
   		 $('[data-toggle="tooltip"]').tooltip();

	}, 1000);

  }


 pushDeviceOnArrays(imei: string){

   const regDev = new Device();
	regDev.imei = imei;

   regDev.registrationOk = 0;

   regDev.regstatustooltip = this.setRegistrationToolTip(0);

   this.newlyRegisteredDevices.push(regDev);

   return this.newlyRegisteredDevices.length - 1;

 }


 callServerForRegistration(imei: string, ktc: string){

  const regStatus = 0;

     const index = this.pushDeviceOnArrays(imei);

     const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
     const options = new RequestOptions({ headers: headers });

	const data = {imei: imei, ktc: ktc};

	this.http.post('/api/v1/register-device', data, options).subscribe((resp) => {
		console.log('Device Registration Resp');
		console.log(resp);

		this.newlyRegisteredDevices[index].registrationOk = 1;
		this.newlyRegisteredDevices[index].regstatustooltip = this.setRegistrationToolTip(1);
 	this.refreshToolTip();

	}, (err) => {

 		console.log('Device Registration Resp ERR');
		console.log(err);

		this.newlyRegisteredDevices[index].registrationOk = 2;
		this.newlyRegisteredDevices[index].regstatustooltip = this.setRegistrationToolTip(2);
             this.refreshToolTip();

	}, () => {

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
  const imeiNum = this.imeinumber.toString();
  const ktcNum = this.ktcnumber.toString();
 return imeiNum === '' || imeiNum.length < 15 || ktcNum.length !== 3;

}



 getDevRegistrationStatusImage(dev: Device){


   if (dev.registrationOk === 0){

    return 'assets/loader.gif';

  }else if (dev.registrationOk === 1){
     return 'assets/check.png';

  }else{
     return 'assets/x.png';
  }

 }



getDevRegistrationWordClass(dev: Device){

  if (dev.registrationOk === 0){

   return {'regPend': true};

  }else if (dev.registrationOk === 1){
    return {'regOk': true, 'regPend': false};

  }else{
    return {'regFail': true, 'regPend': false};
  }


}





  uploadCSV(){
       const input = document.createElement('input');
           input.type = 'file';
	      input.style.display = 'none';

           $('body').append(input);

	    $(input).click();

	   const self = this;

     const readFile = function() {
        const reader = new FileReader();
        reader.onload = function () {

		console.log(reader.result);

		const imeiarray = reader.result.split('\n');
    if (imeiarray[imeiarray.length - 1] === ''){
       imeiarray.pop();
    }

		console.log(imeiarray);
		  for (let i = 0; i < imeiarray.length; i++){

			const imeiandktc = imeiarray[i].split(',');
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
