import { Component, OnInit } from '@angular/core';
import Telnet from 'telnet-client'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  tcp:string = "asdf";

  constructor() { 

	var connection = new Telnet()
 
	var params = {
 	 host: '13.56.171.193',
 	 port: 1337,
 	 shellPrompt: '/ # ',
 	 timeout: 1500,
 	 // removeEcho: 4
	}
 	alert(connection);
	connection.on('ready', function(prompt) {
	  alert(prompt);
 	 connection.exec("track.kidhawk.com", function(err, response) {
		alert(response);
 	   console.log(response);
             this.tcp = response;
 	 })
	})
 
	connection.on('timeout', function() {
 	 console.log('socket timeout!')
 	 connection.end()
	})
 
	connection.on('close', function() {
 	 console.log('connection closed')
	})
 
	connection.connect(params)
   }

  ngOnInit() {
  }



  
}
