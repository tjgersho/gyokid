export class Gps {

  timestamp: string;
  location: {lat:number, lng: number};

  constructor(timestamp: string, location: {lat:number, lng: number}) { 
	this.timestamp = timestamp;
	this.location = location;
	
	}

}
