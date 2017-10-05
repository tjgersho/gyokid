//ts
import { Component } from '@angular/core'

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styles: [`
	.online {
		color: white;
	}
	`]
})

export class ServerComponent {

	serverId:number;
	serverStatus: string;

      constructor(){
	this.serverId  = 10;
	this.serverStatus = Math.random() > 0.5 ? "Online" : "Offline";
	
      }
     

     serverStatusStyle(){

	if(this.serverStatus === "Online"){
		return {"background-color": "#00ff00"};

	}else{

		return {"background-color": "#ffff00"};
	}



	}

	getServerStatus(){
		return this.serverStatus;	
	}

}

