import { Gps } from '../models/gps.model';

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
 alarm: boolean = false;
 constructor(){}
 editTagBoolean:boolean = false;
}