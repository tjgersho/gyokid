import { Injectable } from '@angular/core';
import { Gps } from '../gps.model';


export class Device{
 imei: string;
 shortImei: string;
 tag: string;
 watching: boolean;
 gpsdata: Gps[] = [];

 constructor(imei: string, tag: string = "", watching: boolean = false){

	this.imei = imei;
	
	this.shortImei = imei.substring(imei.length-5, imei.length-1);

        this.tag = tag;

	this.watching = watching;
 }

 
 

}