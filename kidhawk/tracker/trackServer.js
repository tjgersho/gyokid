var db = require('../server/util/db.js');

var moment = require("moment");

function getTime(){
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    console.log('Get Time');
    console.log(hour + min + sec);

    return hour + min + sec;
}


function logData(m){

//"*HQ,865205030993330,V1,025109,A,3935.4775,N,10504.9935,W,0.00,52,171017,FFFFFBFF#"

  var dataArray = m.split(",");
 
var imei = dataArray[1];

 if(dataArray[2]  === "V1"){
    var lat = dataArray[5];
    var latH = dataArray[6];

    var lon = dataArray[7];
    var lonH = dataArray[8];
  }else if(dataArray[2]  === "V4"){
    var lat = dataArray[7];
    var latH = dataArray[8];

    var lon = dataArray[9];
    var lonH = dataArray[10];


    var confirmedCmdTimeStamp = dataArray[4];
    db.runningdev.find({imei:imei, lastCmdTimeStamp: confirmedCmdTimeStamp}).then(function(dev){
      console.log('Found Running Device to update that the command has been found.')
      dev.update({lastCmdConfirmed: true});
    },function(err){
        console.log('COuld not confirm the cmd timestamp!');
        console.log(err);
    });

 } else {

  return;
 }



  var lat = dataArray[5];
  var latH = dataArray[6];

  var lon = dataArray[7];
  var lonH = dataArray[8];

var latFloat = parseFloat(lat)/100;

var latDeg = Math.round(latFloat);
var latHours = Math.round((latFloat - latDeg)*100);
var latMin = ((latFloat - latDeg)*100 - latHours)*100;
var latMinDeg = latMin/60;
var latHourDeg = (latHours+latMinDeg)/60;

var latitude = latDeg + latHourDeg;

var lonFloat = parseFloat(lon)/100;
var lonDeg = Math.round(lonFloat);
var lonHours = Math.round((lonFloat - lonDeg)*100);
var lonMin = ((lonFloat - lonDeg)*100 - lonHours)*100;
var lonMinDeg = lonMin/60;
var lonHourDeg = (lonHours+lonMinDeg)/60;

var longitude  = lonDeg + lonHourDeg;

if(lonH === "W"){
  longitude = -longitude;
}

if(latH === "S"){
  latitude = -latitude;
}

console.log(latitude);
console.log(longitude);

db.gps.create({imei: imei, lat: latitude, lon: longitude}).then(function(gps){
  console.log('Created a gps data point!');
  console.log(gps);
}, function(err){
  console.log('Oops there was an error creating the gps database entry');
});


}
function updateRunningDev(imei, status){

return new Promise(function(resolve, reject){
"*HQ,865205030993330,V1,025109,A,3935.4775,N,10504.9935,W,0.00,52,171017,FFFFFBFF#"
var cmd = 0;

 var alarmOn = false;

if(status[3] === "B"){
  var alarmOn = true;
}

db.runningdev.find({where:{imei: imei}}).then(fuction(dev){
  console.log('Yeah We have a running device.. check for SOS..');
  console.log(dev);
  if(dev.watchStatus === 0){

      if(lastCmdConfirmed && lastCmd === "setToSleep"){
        cmd = 0;

      }else{
        cmd = 99; //put device to sleep and make upload interval long as ballzzz
      }
       resolve(cmd);


  }else if(dev.watchStatus === 1){

    if(dev.lastCmdConfirmed && dev.lastCmd == "setToRunning"){
          cmd = 0;
          resolve(cmd);

    }else{ 

     db.gps.find({where:{imei: imei}, limit: 1, order:[['createdAt', 'DESC']]}).then(function(d){
        console.log("found data");
        var now = moment();
        var lastConn =  moment( d.createdAt, moment.ISO_8601);

          console.log('Last Conn Diff');
          console.log(moment.durration(now.diff(lastConn)).asMinuets());

          if (moment.durration(now.diff(lastConn)).asMinuets() > 1){
              cmd = 40; //make time interval 20 sec..
              var updateData = {interval: 20};
              if(alarmOn){
                  updataData.alarm = alarmOn;
               }
                 dev.update(updataData);

          } else {
            cmd = 0;
          }

          resolve(cmd);
      },function(err){
        console.log("no data for this device");
        reject(err);
      });

    }
 
 }

  },function(err){
     console.log('Device was not found in the running device query..');
     reject(err);
  })

 });
}

function sendCmds(imei, cmd, socket){

switch (cmd){
  case 0: ///DO NOTHING...
    return;
  break;
  case 1: // set time interval to 20 sec..
    var getTimeString = getTime();

    socket.write("*HQ,"+imei+",D1,"+getTimeString+",20,#");
    db.runningdev.find({where:{imei: imei}}).then(function(dev){
        console.log('found device to update the time cmd sent');
        console.log(dev.imei);
        dev.update({lastCmdTimeStamp: getTimeString, lastCmdConfirmed: false, , lastCmd: "setToRunning"});

    },function(err){
        console.log('Couldnt find dev to update time cmd');
        console.log(err);

    });
  break;
  case 40: // Reset the device..
    var getTimeString = getTime();

    socket.write("*HQ,"+imei+",R1,"+getTimeString+"#");

    db.runningdev.find({where:{imei: imei}}).then(function(dev){
        console.log('found device to update the time cmd sent');
        console.log(dev.imei);
        dev.update({lastCmdTimeStamp: getTimeString, lastCmdConfirmed: false, , lastCmd: "resetDevice"});

    },function(err){
        console.log('Couldnt find dev to update time cmd');
        console.log(err);

    });

  break;
  case 99:  // Put device to sleep..
    var getTimeString = getTime();
    
    socket.write("*HQ,"+imei+",D1,"+getTimeString+",2000,#");
        db.runningdev.find({where:{imei: imei}}).then(function(dev){
        console.log('found device to update the time cmd sent');
        console.log(dev.imei);
        dev.update({lastCmdTimeStamp: getTimeString, lastCmdConfirmed: false, lastCmd: "setToSleep"});

    },function(err){
        console.log('Couldnt find dev to update time cmd');
        console.log(err);
        
    });

  break;
}

}

const net = require('net');
const server = net.createServer((socc) => {
  // 'connection' listener
  console.log('client connected');
  console.log(socc);

  var clientAddr = socc.remoteAddress + ":" + socc.remotePort;

  socc.on('end', () => {
    console.log('client disconnected');
  });
 

  socc.on('data', (data) => {

    console.log('Data');
    console.log(data.toString());
    var message = data.toString();
  
     var dataArray = message.split(",");

     if(dataArray.length > 7){

       var imei = dataArray[1];
       var status = dataArray[dataArray.length-1].slice(0,-1);

       logData(message);

      updateRunningDev(imei, status).then(function(cmd){
          console.log('The commmand has been received, the device has been updated...');
          console.log(cmd);
          sendCmds(imei, cmd, socc);

      },function(err){

        console.log('There was an error running the update on the device..');
        console.log(err);

        sendCmds(imei, 99, socc);  // 99 put device to sleep...

      });

     }else{
      socc.write('You are not allowed');
      socc.end();
     }

  });
   
  socc.pipe(socc);
});

server.on('error', (err) => {
  throw err;
});

server.listen(8083, () => {
  console.log('server bound');
});





