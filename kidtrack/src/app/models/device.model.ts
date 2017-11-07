import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response } from '@angular/http';
import { Gps } from '../models/gps.model';
import { UserService } from '../services/user.service';

@Injectable()
export class Device{
 id: number;
 imei: string;
 sim: string;
 shortImei: string;
 tag: string = '';
 watching: boolean = false;
 gpsdata: Gps[] = [];
 registrationOk: number = 0;
 regstatustooltip: string = "Registration is good";
 user: UserService;
 http: Http;

 constructor(){

	console.log('INITIALIZATION OF DEVICE');
	

 }

 setDevice(obj){

	console.log('Set Device method');
	console.log(obj);

	var {imei, sim, tag, watching} = obj;

	this.imei = imei;

	this.sim = sim;
	
	this.shortImei = this.imei.substring(this.imei.length-5, this.imei.length-1);

	this.tag = tag;

  }

 getGpsData(){
	console.log('This device... get gps Data');
	console.log(this.imei);
	 var gpsDataArray: Gps[]  = [];
	
	
	 gpsDataArray.push(new Gps(new Date().toString(), {lat: (Math.random()*2-1)*90, lng: (Math.random()*2-1)*180}));

	 this.gpsdata = gpsDataArray;

 }
 

 updateTag(){
	
	console.log('Update Device Tag METHOD');
	console.log(this.tag);

        let headers = new Headers({ 'Content-Type': 'application/json', auth: this.user.token });
        let options = new RequestOptions({ headers: headers });
		

	this.http.put("/api/v1/device/"+this.id, {tag: this.tag}, options).subscribe((response) =>{

		console.log('Update Response');
		console.log(response);

	});

 }


resetGpsDataZeroforTest(){


	return {lat: (Math.random()*2-1)*90, lng: (Math.random()*2-1)*180};
}

 updateWatching(){
	console.log('Device update watching');
	console.log(this);
	console.log(this.watching);


      this.watching = !this.watching;
   console.log(this.watching);


   let headers = new Headers({ 'Content-Type': 'application/json', auth: this.user.token });
        let options = new RequestOptions({ headers: headers });
		

	this.http.put("/api/v1/device/"+this.id, {watching: this.watching}, options).subscribe((response) =>{

		console.log('Update Response');
		console.log(response);

	});


	///send to database...

 }

}