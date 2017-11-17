import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response } from '@angular/http';
import { Gps } from '../models/gps.model';


@Injectable()
export class DeviceService {


constructor(private http: Http){
	console.log('INITIALIZATION OF DEVICE SERVICE');
 }


getGpsData(dev, token){

	var self = this;


  return new Promise(function(resolve, reject){
	console.log('This device... get gps Data');
	console.log(dev.imei);
	

	let headers = new Headers({ 'Content-Type': 'application/json', auth: token });
        let options = new RequestOptions({ headers: headers });
		
	self.http.get('/api/v1/device/' + dev.id, options).subscribe((resp) => {

 		var gpsDataArray: Gps[]  = [];

		console.log('Get device gps rsponse');
		console.log(resp.json());
		var gpsData = resp.json();


		for(var i = 0; i< gpsData.length; i++){
			 gpsDataArray.push(new Gps(gpsData[i].createdAt, {lat: parseFloat(gpsData[i].lat), lng:  parseFloat(gpsData[i].lon)}));
		}
		console.log('GPS Data Array');
		console.log(gpsDataArray);

		 dev.gpsdata = gpsDataArray;

		console.log('this Device');
		console.log(dev);

		resolve('GOTS SOME GPS DATA');

	 }, (err) => {

		console.log('Get device gps rsponse ERR');
		console.log(err);
		reject('DIDNt Get GPS DATA for device');


	}, () =>{});

  });

	
	

 }
 

 updateTag(dev, token){
	
	console.log('Update Device Tag METHOD');
	console.log(dev.tag);

        let headers = new Headers({ 'Content-Type': 'application/json', auth: token });
        let options = new RequestOptions({ headers: headers });
		

	this.http.put("/api/v1/device/"+dev.id, {tag: dev.tag}, options).subscribe((response) =>{

		console.log('Update Response');
		console.log(response);

	});

 }



 resetGpsDataZeroforTest(){


	return {lat: (Math.random()*2-1)*90, lng: (Math.random()*2-1)*180};
}


 turnOffAllWatching(token){

      console.log('TURN OFF ALL WATCHING');

        let headers = new Headers({ 'Content-Type': 'application/json', auth: token });
        let options = new RequestOptions({ headers: headers });
		
  return this.http.put("/api/v1/devices", {watching: false}, options);
  

	
 }
 
 updateWatching(dev, token){
	console.log('Device update watching');
	console.log(dev);
	console.log(dev.watching);

	dev.watching = !dev.watching;
 
   console.log(dev.watching);


        let headers = new Headers({ 'Content-Type': 'application/json', auth: token });
        let options = new RequestOptions({ headers: headers });
		

	this.http.put("/api/v1/device/"+dev.id, {watching: dev.watching}, options).subscribe((response) =>{

		console.log('Update Response');
		console.log(response);

	});


	///send to database...

 }


}