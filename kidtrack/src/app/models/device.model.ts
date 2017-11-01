import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response } from '@angular/http';
import { Gps } from '../models/gps.model';
import { UserService } from '../services/user.service';

@Injectable()
export class Device{
 imei: string;
 shortImei: string;
 tag: string;
 watching: boolean;
 gpsdata: Gps[] = [];
 registrationOk: number = 0;
 regstatustooltip: string = "Registration is good";
 http: Http;
 user: UserService;

 constructor(imei: string, tag: string = "", watching: boolean = false, ){

	this.imei = imei;
	
	this.shortImei = imei.substring(imei.length-5, imei.length-1);

        this.tag = tag;

	this.watching = watching;
 }

 getGpsData(){
	console.log('This device... get gps Data');
	console.log(this.imei);
	this.gpsdata.push(new Gps(new Date().toString(), {lat: (Math.random()*2-1)*90, lng: (Math.random()*2-1)*180}));

 }
 

 updateTag(){
	

        let headers = new Headers({ 'Content-Type': 'application/json', auth: this.user.token });
        let options = new RequestOptions({ headers: headers });
		

	this.http.put("/api/v1/device/"+this.imei, {tag: this.tag}, options).subscribe((response) =>{

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

	///send to database...

 }

}