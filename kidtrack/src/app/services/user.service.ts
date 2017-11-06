import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Device } from '../models/device.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';


@Injectable()
export class UserService {
  id: number = -1;
  username: string = "";
  email: string = "";
  token: string = "";
  devices: Device[] = [];
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  pingCredits: number = 1000;




  constructor(private router: Router, private http: Http) {

	var self = this;

	
	console.log('UserService initialize');

  	this.getUserFromToken().then(function(resp){

	  },function(err){

	});

	
  }




  isAdminUser(){

	console.log("CALLLING ----- IS ADMIN USER ");

	var self = this;

	return new Promise( (resolve, reject) => {
		console.log('Is Admin user token variable');
		console.log(self.token);
		console.log(this.token);

             let headers = new Headers({ 'Content-Type': 'application/json', Auth: self.token});
             let options = new RequestOptions({ headers: headers });
		this.http.get('/api/v1/user/getAdminByToken', options).subscribe((resp)=>{
			
			console.log('user/getAdminByToken response');
		        console.log('In the isAdmin response');
			console.log(resp);

			self.isAdmin = true;
		
			resolve(true);

		},(err) => {
		         console.log('In the isAdmin response ERR');
			console.log(err);
			this.isAdmin = false;
			resolve(false);

		},()=>{console.log('Get Admin By Token Call completion');});
	});

  }

  getUserFromToken(){

	return new Promise( (resolve, reject) => {

	var localToken = localStorage.getItem("token");
	
	if(localToken  !== "" && localToken !== this.token){
		this.token = localToken;
	}

	if(this.token === ""){
	   reject(false);
	}

        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
	  this.http.post('/api/v1/user/findByToken', {token: this.token}).subscribe((resp) =>{

			console.log("in the http post of get User from token response");
			console.log(resp);
			console.log(resp.json());
			var user = resp.json();

		      	this.initializeUser(user);
		       
			resolve(true);


		},(err)=>{
			console.log("in the http post of get User from token response ERR");
			console.log(err);

			reject(false);
			
				
		});

	});	

  }


  initializeUser(user){

	console.log("INITIALIZING USER");
	
  	this.username = user.username;
  	this.email = user.email;
	this.pingCredits =  user.pingCredits;
  	this.isLoggedIn = true;
	
  	this.isAdminUser().then(function(resp){
		console.log('In initialize user isADMIN user response');
		console.log(resp);
		

	},function(err){
		console.log('In initialize user isADMIN user responseERR');
		console.log(err);

	});


	this.getUserDevices();

	this.getAllDeviceGpsData();
  }

  getUserDevices(){

        let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.token});
        let options = new RequestOptions({ headers: headers });
         this.http.get("/api/v1/user/devices/", options).subscribe((resp)=>{

			console.log('Respons get user devices');
			console.log(resp);
			var devices = resp.json();
			console.log(devices);

			this.devices = devices;
			
		},(err)=>{

		},()=>{

		});


  }

  getAllDeviceGpsData(){
	console.log('Get all Device GPS data');


	console.log(this.devices.length);

	for (let dev of this.devices){
		dev.getGpsData();

	}
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

	return this.http.post("/api/v1/user", data, options);

  }

  login(usernameoremail: string, password: string){

	
	console.log('usernameoremail');
	console.log(usernameoremail);
	console.log('password');
	console.log(password);

	//Submit to server to login.. get back a token.
  	var data = {email_or_username: usernameoremail, password: password};


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

	return this.http.post("/api/v1/login",   data, options).map((resp)=>{
		console.log('Login Map response');
		console.log(resp);

		var token = resp.headers.get('auth');
		console.log('Token from response');
		console.log(token);
                localStorage.removeItem('token');
		localStorage.setItem('token', token );

		this.token = token;
		this.isLoggedIn = true;
       		console.log('Local Storage in login');
		console.log(localStorage.token);

		console.log('User Service token');
		console.log(this);
		console.log(this.token);

	        //this.initializeUser(user);

		return resp;
	}).catch((err) => {
		console.log('Catch Error in the login..');
		console.log(err);
		
		return Observable.throw(err);

	});


	

  }

  logout(){
      
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.router.navigate(['/']);
      localStorage.removeItem('token');
 
       let headers = new Headers({ 'Content-Type': 'application/json' , Auth: this.token});
       let options = new RequestOptions({ headers: headers });


	this.http.delete('/api/v1/logout', options).subscribe((resp) => {
		console.log('Resp from logout endpoint');
		console.log(resp);

		this.token = '';
 
            }, (err) => {
		console.log('Response err from logout endpoint');
		console.log(err);

		}, () => {
		    console.log('logout endpoint subscribe complete');
			});

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
