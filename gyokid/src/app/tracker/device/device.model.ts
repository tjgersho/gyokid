import { Injectable } from '@angular/core';
import { Gps } from '../gps.model';


export class Device{
 imei: string;
 id: string;
 tag: string;
 watching: boolean;
 gpsdata: Gps[] = [];

 constructor(imei: string, tag: string, watching: boolean){

	this.imei = imei;
	
	this.id = imei.substring(imei.length-5, imei.length-1);

        this.tag = tag;

	this.watching = watching;
 }

 
 

}