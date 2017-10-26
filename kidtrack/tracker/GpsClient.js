/* Or use this example tcp client written in node.js.  (Originated with 
example code from 
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

var net = require('net');


var moment = require("moment");



class GpsClient {
 
 
 constructor(imei, interval = 100){
	this.socket = new net.Socket();
	this.imei = imei;
	this.interval = interval;
	this.counter = 0;
	this.alarm = false;
        this.runtime;
	this.lastCmd;
	this.lastCmdTime;

 }

 createConn(port, domain){

	this.socket.connect(port, domain, this.connectCallback.bind(this));
	this.socket.on('data', this.dataCallback.bind(this));
	this.socket.on('close', this.closeCallback.bind(this));
	this.socket.on('error', this.errorCallback.bind(this));

	this.runtime = setInterval(this.uploadData.bind(this), 1000);  ///Run the uploadData function every second



 }

 
 connectCallback(data){
     console.log('Connected');

 }

 dataCallback(data){
    	console.log('Received: ' + data);
	// this.socket.destroy(); // kill client after server's response
       var dataArray = data.toString().split(",");
	console.log('Command');
	console.log(dataArray[2]);
	if(dataArray[2] === "D1"){

		//set GpsClient interval... 
		this.interval = parseInt(dataArray[4], 10);
		console.log('The GPSClient has a new Interval');
		console.log(this.interval);
                
                 this.lastCmd = "D1";
                 this.lastCmdTime = dataArray[3];
                 this.uploadV4Data();
	}

       if(dataArray[2] === "R1"){
          //Reset Device..

            this.lastCmd = "R1";
	    this.lastCmdTime = dataArray[3];
            this.uploadV4Data();

            this.socket.destroy();
            clearTimeout(this.runtime);

	}


 }


 closeCallback(data){
    console.log('Connection closed');
    console.log(data);
   clearTimeout(this.runtime);

 }

 errorCallback(err){
    console.log('Server/Client error');
    console.log(err);
    this.socket.destroy();
     clearTimeout(this.runtime);
 }


  getTime(){
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + min + sec;
  }

  getDate(){

    var date = new Date();

    var year = date.getFullYear();
    year = year.toString().substr(2,2);

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    var month  = date.getMonth();
    month = (month < 10 ? "0" : "") + month;

    return day+ month + year;

  }

 getLat(){

	return 3935.4775;
  }

 getLon(){
	
	return 10504.9935;

 }
 
 getAlarm(){
	if(this.alarm){
		return "B";
	}else{
		return "F";
	}

 }

 uploadData(){

	this.counter = this.counter + 1;

	if(this.counter >= this.interval){
             this.counter = 0;
		var sendMessage = "*HQ," + this.imei + 
			",V1," + this.getTime() + 
			",A," +
			this.getLat() + ",N," +
			this.getLon() + ",W," + 
                        "0.00,52," + this.getDate() +
			",FFF"+this.getAlarm()+"FFF#";
		console.log("Sent Msg to Server: " + sendMessage);



		this.socket.write(sendMessage);

	}
 }


 uploadV4Data(){

		var sendMessage = "*HQ," + this.imei + 
			",V4," +this.lastCmd + "," + this.lastCmdTime + "," + this.getTime() + 
			",A," +
			this.getLat() + ",N," +
			this.getLon() + ",W," + 
                        "0.00,52," + this.getDate() +
			",FFF"+this.getAlarm()+"FFF#";
		console.log("Sent Msg to Server: " + sendMessage);



		this.socket.write(sendMessage);

 }


}



var gp = new GpsClient("123456789123456789", 10);

gp.createConn(8083, '0.0.0.0');




