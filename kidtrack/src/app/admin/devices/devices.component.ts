import { Component, OnInit } from '@angular/core';

declare var jquery:any;
declare var $ :any;

import { Http, RequestOptions, Headers } from '@angular/http';
import { Device } from '../../models/device.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';

import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  loading: boolean = false;
  deviceArray: Device[] = [];
  imeinumber: string;
  simnumber: string;

  limit:number = 300;
  page:number = 0
  order:string = '';

  constructor(private user: UserService, private http: Http) { 
    var self = this;
    this.loading = true;


    this.getDevices();


 
  }

 ngOnInit() {}

 addNewDevice(imei:string = this.imeinumber, sim:string = this.simnumber){
   
	this.loading = true;

	var dev = {imei: imei, sim: sim};
 
       let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
      let options = new RequestOptions({ headers: headers });

     let deviceUrl = '/api/v1/admin/device';
  
     this.http.post(deviceUrl, dev, options).subscribe((response) => {

			

		this.getDevices();

 		 this.loading = false;


	  },(err)=>{

  		this.loading = false;

	 });
            


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

		var devarray = reader.result.split("\n");
    if(devarray[devarray.length-1] === ""){
       devarray.pop();
    }
	
		console.log(devarray);
		  for(var i=0; i<devarray.length; i++){

		  	  var imeiandsim = devarray[i].split(',');


		  	   self.addNewDevice(imeiandsim[0], imeiandsim[1].replace(/(\r\n|\n|\r)/gm,""));
			
		  }

        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(input.files[0]);
      };
 	

      input.addEventListener('change', readFile);

   }


 getDevices(){


	console.log('Get Device');
	console.log(this.user.token);

  this.loading = true;

              let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
             let options = new RequestOptions({ headers: headers });

   let deviceUrl = '/api/v1/admin/devices?limit=' + this.limit + '&page=' + this.page + '&order=' + this.order;
  
     this.http.get(deviceUrl, options).subscribe((response) => {

			console.log('device array response');
			console.log(response);
			this.deviceArray = response.json();
 		        this.loading = false;


	  },(err)=>{

		console.log('Get Device array Err');
		console.log(err);

  		        this.loading = false;

	 });
            


 }


 updateOwner(dev){


	console.log('Update owner  / exactly what happens when someone registers a device.. i.e. sequelize relation hookup');
	console.log(dev);

  this.loading = true;

	
   let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
   let options = new RequestOptions({ headers: headers });

   let data = {userId: dev.userId};

     this.http.put('/api/v1/admin/device/'+dev.id, data, options).subscribe((response) => {

			console.log('device array response');
			console.log(response);
		         this.getDevices();
 		        this.loading = false;
	  },(err)=>{
  		this.loading = false;
	 });
            

  }

 deregister(id: number){

	console.log('DeRegister device -- id: ');
	console.log(id);

	 this.loading = true;

	
   let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
   let options = new RequestOptions({ headers: headers });

     let data = {id: id, deregister: true};

     this.http.post('/api/v1/admin/device/'+id, data, options).subscribe((response) => {

			console.log('device deregister response');
			console.log(response);
		         this.getDevices();
 		        this.loading = false;
	  },(err)=>{
  		this.loading = false;
	 });
            




 }


 deleteDevice(id: number){

	this.loading = true;

         let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
         let options = new RequestOptions({ headers: headers });

  
     this.http.delete('/api/v1/admin/device/'+id,  options).subscribe((response) => {

			console.log('device delete response');
			console.log(response);
		       this.getDevices();
 		 this.loading = false;


	  },(err)=>{

  		this.loading = false;

	 });
            




 }





}
