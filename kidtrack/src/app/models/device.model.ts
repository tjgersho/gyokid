import { Gps } from '../models/gps.model';

export class Device{
 id: number;
 imei: string;
 sim: string;
 shortImei: string;
 tag = '';
 watching = false;
 gpsdata: Gps[] = [];
 registrationOk = 0;
 regstatustooltip = 'Registration is good';
 alarm = false;
 constructor(){}
 editTagBoolean = false;
}
