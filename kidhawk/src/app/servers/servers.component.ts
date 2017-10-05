import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
	
	allowNewServer:boolean = false;
	serverCreationStatus: string = "No Server Was Created";
        serverName: string = "Test Server"
	serverCreated = false;
	userName:string = "";

	servers: Array<string> = ["Test Server", "Test Server 2"];

	details: Array<number> = [];
	click:number = 0;


   constructor() {
	 setTimeout(()=>{this.allowNewServer = true},2000)
   }

  ngOnInit() {
  	console.log('Servers INIT');
	}

   onCreateServer(){
	this.serverCreationStatus = "Server Was Created -- Name is " + this.serverName;
	this.serverCreated = true;
	this.servers.push(this.serverName);
	this.serverName = "";
   }

   onUpdateServerName(e: any){
	console.log(e);
	this.serverName = e.target.value;
   }

   allowUsernameReset(){
		
	if(this.userName !== ''){
		return true;
	}else{
		return false;
	}

    }

    onResetUsername(){
		this.userName = "";
    }
    displayDetailsClick(e: any){
	console.log(e);
	this.click++;
	this.details.push(this.click);

   }

   styleDetail(index){
	console.log(index);
        if(index > 5){
		return {"background-color": "#0000ff"};

	}
   }

	classDetail(index){
console.log(index);
 		 if(index > 5){
			return {"online": true};
			}

	}

}
