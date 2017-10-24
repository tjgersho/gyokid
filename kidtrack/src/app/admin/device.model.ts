export class Device{
	imei: string;
	sim: string;
	interval: number = 100;
	alarm: boolean = false;
	watching: boolean = false;
	lastCmdTimeStamp: string = "";
	lastCmdConfirmed: boolean = false;
	lastCmd: string = "";

	constructor(imei: string, sim: string){

		this.imei = imei;
		this.sim = sim;


	}
}
