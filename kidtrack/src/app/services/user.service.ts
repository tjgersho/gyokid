import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Device } from '../tracker/device/device.model';

@Injectable()
export class UserService {
  username: string = "";
  email: string = "";
  token: string = "";
  devices: Device[] = [];
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  cellularCredits: number = 0;


  constructor(private router: Router, private http: Http) {

	var self = this;
	console.log('UserService initialize');

  	this.getUserFromToken().then(function(user){
	
		self.initializeUser(user);
		
	},function(err){
		console.log('Not loggedin..');
		console.log(err);


	});
  }


  getUserFromToken(){

	return new Promise( (resolve, reject) => {

	var token = '';

        // 	console.log('LocalStorage token PRE');
	//		console.log(localStorage.token);
	
	//if(this.token !== ""){
	//	token = this.token;
	//	localStorage.setItem('token', token);
	//}

	var localToken = localStorage.getItem("token");
	console.log('local Token');
	console.log(localToken);
	
	if(localToken  !== "" && localToken !== this.token){
		token = localToken;
		this.token = token;
	}

	  setTimeout(function(){
		
			console.log('LocalStorage token');
			console.log(localStorage.token);

		if(localToken !== undefined  && localToken !== null){

		  var devices = []; // [new Device("1029220920830293840",  "", true)];

		  var user = {username: "tjgers", email: 't@t.com', token: localToken, devices: devices, isAdmin: true };
		  resolve(user);

		}else{

		reject("not Logged in");
		}


	
	  }, 2000);

	});

  }


  initializeUser(user){
  	this.username = user.username;
  	this.email = user.email;
  	this.token = user.token;
  	this.devices = user.devices;
  	this.isLoggedIn = true;
  	this.isAdmin = user.isAdmin;
  }


  signup(username: string, email: string, password: string){
	console.log('username');
	console.log(username);
    console.log('email');
	console.log(email);
	console.log('password');
	console.log(password);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
	    let data = {username: username, email: email, password: password};

	return this.http.post("/api/v1/users", data, options);

  }

  login(usernameoremail: string, password: string){

	
	console.log('usernameoremail');
	console.log(usernameoremail);
	console.log('password');
	console.log(password);

	//Submit to server to login.. get back a token.
  
	this.isLoggedIn = true;
	this.isAdmin = true;
	

	
	var token = "alkdjlaskdjoi02oisjovkaki92ij";


	localStorage.setItem('token', token );

	this.token = token;

        console.log('Local Storage in login');
	console.log(localStorage.token);


	this.router.navigate(['/tracker']);

  }

  logout(){
      
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.router.navigate(['/']);
      localStorage.removeItem('token');

    //Destroy Token on server
  }


  deviceWatchingUpdate(dev: Device){
	
	 //http sever update device watching  and tag..

	for(var i=0; i<this.devices.length; i++){
		if(this.devices[i].imei === dev.imei){
			this.devices[i].watching = dev.watching;
			this.devices[i].tag = dev.tag;
		}
	}


  }

  userHasAvailableDevices(){
	
      for(var i=0; i<this.devices.length; i++){
		if(!this.devices[i].watching){
				return true;
		}
	}
     return false;

  }

  userHasTrakingDevices(){

    	
      for(var i=0; i<this.devices.length; i++){
		if(this.devices[i].watching){
				return true;
		}
	}
     return false;

  }



}
