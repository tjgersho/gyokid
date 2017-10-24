import { Component, OnInit } from '@angular/core';
import { Device } from '../device.model';

import { AdminService } from '../admin.service';

declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  loading: boolean = false;
  deviceArray: Device[] = [];
  imeinumber: string;
  simnumber: string;

  constructor(private admin: AdminService) { 
    var self = this;
    this.loading = true;
  	 this.admin.getDevices().then(function(devs){
  	 		console.log('Got Devices');
  	 		console.log(devs);
  	   	self.deviceArray = devs;
         self.loading = false;
  	 },function(err){
  	 	console.log('Error Getting devices');
  	 	console.log(err);
                self.loading = false;
  	 });

  }

 ngOnInit() {}

 addNewDevice(imei:string = this.imeinumber, sim:string = this.simnumber){
   	var self = this;

	this.loading = true;
 	//http request to add new device...
 	setTimeout(function(){
 		console.log(imei);
 		console.log(sim);
 		console.log(self.deviceArray);
 		self.loading = false;

 		self.deviceArray.push(new Device(imei, sim));

 	}, 1000);

 }
	
  uploadCSV(){
       var input=document.createElement('input');
           input.type="file";
	      input.style.display = 'none';

           $('body').append(input);

	    $(input).click();

	   var self = this;

     var readFile = function() {
        var reader = new FileReader();
        reader.onload = function () {

		console.log(reader.result);

		var devarray = reader.result.split("\n");
    if(devarray[devarray.length-1] === ""){
       devarray.pop();
    }
	
		console.log(devarray);
		  for(var i=0; i<devarray.length; i++){

		  	  var imeiandsim = devarray[i].split(',');

		  	   self.addNewDevice(imeiandsim[0], imeiandsim[1])
			
		  }

        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(input.files[0]);
      };
 	

      input.addEventListener('change', readFile);

   }


}
