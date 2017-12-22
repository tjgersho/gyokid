import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response } from '@angular/http';
import { Gps } from '../models/gps.model';
import * as moment from 'moment';



@Injectable()
export class DeviceService {


constructor(private http: Http){
	console.log('INITIALIZATION OF DEVICE SERVICE');
 }


 getGpsData(devArry, token){

  const self = this;

const devIdArry = [];
 for (let i = 0; i < devArry.length; i++){

	devIdArry.push(devArry[i].id);

 }
  return new Promise(function(resolve, reject){

	const headers = new Headers({ 'Content-Type': 'application/json', auth: token });
        const options = new RequestOptions({ headers: headers });

	self.http.post('/api/v1/allGpsData', {devArry: devIdArry}, options).subscribe((resp) => {



		console.log('Get device gps rsponse');
		console.log(resp.json());
		const gpsData = resp.json();
		console.log(gpsData);

		console.log('Device Array length');
		console.log(devArry.length);

		for (let j = 0; j < devArry.length; j++){
		console.log(j);
		  const gpsDataArray: Gps[]  = [];
		   for (let i = 0; i < gpsData.length; i++){

			if (gpsData[i].devId === devArry[j].id){ // Find device id in gpdData..

			 devArry[j].alarm = gpsData[i].alarm;


                         for (let k = 0; k < gpsData[i].gpsData.length; k++){


			   const timeStamp = moment(gpsData[i].gpsData[k].createdAt).format('MM/DD/YY LTS');
			   console.log('TimeStamp');
			   console.log(timeStamp);


			   gpsDataArray.push(new Gps(timeStamp, {lat: parseFloat(gpsData[i].gpsData[k].lat), lng:  parseFloat(gpsData[i].gpsData[k].lon)}));

			 }

			  break;

                        }
		   }
		   console.log('GPS Data Array');
		   console.log(gpsDataArray);
		   devArry[j].gpsdata = gpsDataArray;
		   console.log('this Device');
		  console.log(devArry[j]);
		}


		resolve('GOTS SOME GPS DATA');

	 }, (err) => {

		console.log('Get device gps rsponse ERR');
		console.log(err);
		reject('DIDNt Get GPS DATA for device');


	}, () => {});

  });



 }


 updateTag(dev, token){

	console.log('Update Device Tag METHOD');
	console.log(dev.tag);

        const headers = new Headers({ 'Content-Type': 'application/json', auth: token });
        const options = new RequestOptions({ headers: headers });


	this.http.put('/api/v1/device/' + dev.id, {tag: dev.tag}, options).subscribe((response) => {

		console.log('Update Response');
		console.log(response);

	});

 }



 resetGpsDataZeroforTest(){


	return {lat: (Math.random() * 2 - 1) * 90, lng: (Math.random() * 2 - 1) * 180};
}


 turnOffAllWatching(token){

      console.log('TURN OFF ALL WATCHING');

        const headers = new Headers({ 'Content-Type': 'application/json', auth: token });
        const options = new RequestOptions({ headers: headers });

  return this.http.put('/api/v1/devices', {watching: false}, options);



 }

 updateWatching(dev, token){
	console.log('Device update watching');
	console.log(dev);
	console.log(dev.watching);

	dev.watching = !dev.watching;

   console.log(dev.watching);


        const headers = new Headers({ 'Content-Type': 'application/json', auth: token });
        const options = new RequestOptions({ headers: headers });


	this.http.put('/api/v1/device/' + dev.id, {watching: dev.watching}, options).subscribe((response) => {

		console.log('Update Response');
		console.log(response);

	});


	///send to database...

 }




clearAlarm(devId, token){

  const self = this;


        const headers = new Headers({ 'Content-Type': 'application/json', auth: token });
        const options = new RequestOptions({ headers: headers });


	this.http.put('/api/v1/device/' + devId, {alarm: false}, options).subscribe((response) => {

		console.log('CLEAR ALARM RESPONSE!!!!');
		console.log(response);

	},
	 (err) => {
		console.log('ERR clearing alarm.');
		console.log(err);
          },
	 () => {});




 }




}





