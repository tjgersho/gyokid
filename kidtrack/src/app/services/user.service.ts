import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Device } from '../models/device.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { DeviceService } from './device.service';


@Injectable()
export class UserService {
  id: number = -1;
  username = '';
  email = '';
  token = '';
  devices: Device[] = [];
  isLoggedIn = false;
  isAdmin = false;
  pingCredits = 1000;
  referralCode = '';
  referrals: object[] = [];
  referralCount: number;
  allDeviceWatching = false;

  constructor(private router: Router, private http: Http, private deviceService: DeviceService) {

	const self = this;


	//console.log('UserService initialize');

  	this.getUserFromToken().then(function(resp){

	  }, function(err){

	});


  }




  isAdminUser(){

	//console.log('CALLLING ----- IS ADMIN USER ');

	const self = this;

	return new Promise( (resolve, reject) => {
		//console.log('Is Admin user token variable');
		//console.log(self.token);
		//console.log(this.token);

             const headers = new Headers({ 'Content-Type': 'application/json', Auth: self.token});
             const options = new RequestOptions({ headers: headers });
		this.http.get('/api/v1/user/getAdminByToken', options).subscribe((resp) => {

			//console.log('user/getAdminByToken response');
		        //console.log('In the isAdmin response');
			//console.log(resp);

			self.isAdmin = true;

			resolve(true);

		}, (err) => {
		         //console.log('In the isAdmin response ERR');
			//console.log(err);
			this.isAdmin = false;
			resolve(false);

		}, () => {
		  //console.log('Get Admin By Token Call completion');
		 });
	});

  }

  getUserFromToken(){

	return new Promise( (resolve, reject) => {

	const localToken = localStorage.getItem('token');

	if (localToken  !== '' && localToken !== this.token){
		this.token = localToken;
	}

	if (this.token === ''){
	   reject(false);
	}

	//console.log('Token in get user from token');
	//console.log(this.token);


        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });
	  this.http.post('/api/v1/user/findByToken', {token: this.token}).subscribe((resp) => {

			//console.log('in the http post of get User from token response');
			//console.log(resp);
			//console.log(resp.json());
			const user = resp.json();

		      	this.initializeUser(user);

			resolve(user);


		}, (err) => {
			//console.log('in the http post of get User from token response ERR');
			//console.log(err);

			reject(false);


		});

	});

  }


  initializeUser(userData){

	//console.log('INITIALIZING USER');

  	this.username = userData.username;
  	this.email = userData.email;
	this.pingCredits =  userData.pingCredits;
  	this.isLoggedIn = true;
        this.referralCode = userData.referralCode;

	const deviceArray: Device[] = [];
	this.referralCount = userData.referralCount;
        this.referrals =   userData.referrals;


	for (let i = 0; i < userData.devices.length; i++){
		const dev = new Device();
		dev.imei = userData.devices[i].imei;
		dev.id = userData.devices[i].id;
	        dev.alarm = userData.devices[i].alarm;
   		dev.watching = userData.devices[i].watching;
		dev.sim = userData.devices[i].sim;
		dev.tag = userData.devices[i].tag;



		deviceArray.push(dev);
        }

	this.devices = deviceArray;

	this.allDeviceWatching = true;
	for (let i = 0; i < this.devices.length; i++){
		if (!this.devices[i].watching){
		   		this.allDeviceWatching = false;
				break;
		}

	}



  	this.isAdminUser().then(function(resp){
		//console.log('In initialize user isADMIN user response');
		//console.log(resp);


	}, function(err){
		//console.log('In initialize user isADMIN user response ERR');
		//console.log(err);

	});


  }

  getUserDevices(){

        const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.token});
        const options = new RequestOptions({ headers: headers });
         this.http.get('/api/v1/user/devices/', options).subscribe((resp) => {

			//console.log('Respons get user devices');
			//console.log(resp);
			const devices = resp.json();
			//console.log(devices);

			this.devices = devices;

		}, (err) => {

		}, () => {

		});


  }

   refreshData(){

	return this.getUserFromToken();


  }

  getAllDeviceGpsData(){
	//console.log('Get all Device GPS data');


	//console.log(this.devices.length);


	this.deviceService.getGpsData(this.devices, this.token);


  }


  signup(username: string, email: string, password: string, refCode: string){
	//console.log('username');
	//console.log(username);
        //console.log('email');
	//console.log(email);
	//console.log('password');
	//console.log(password);
	//console.log('Ref Code');
	//console.log(refCode);

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
	    const data = {username: username, email: email, password: password, referralCode: refCode};

	return this.http.post('/api/v1/user', data, options);

  }

  login(usernameoremail: string, password: string){


	//console.log('usernameoremail');
	//console.log(usernameoremail);
	//console.log('password');
	//console.log(password);

	//Submit to server to login.. get back a token.
  	const data = {email_or_username: usernameoremail, password: password};


        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

	return this.http.post('/api/v1/login',   data, options).map((resp) => {
		//console.log('Login Map response');
		//console.log(resp);

		const token = resp.headers.get('auth');
		//console.log('Token from response');
		//console.log(token);
                localStorage.removeItem('token');
		localStorage.setItem('token', token );

		this.token = token;
		this.isLoggedIn = true;
       		//console.log('Local Storage in login');
		//console.log(localStorage.token);

		//console.log('User Service token');
		//console.log(this);
		//console.log(this.token);

	        //this.initializeUser(user);

		return resp;
	}).catch((err) => {
		//console.log('Catch Error in the login..');
		//console.log(err);

		return Observable.throw(err);

	});




  }

  logout(){

      this.isLoggedIn = false;
      this.isAdmin = false;
      this.router.navigate(['/']);
      localStorage.removeItem('token');

       this.clearWatchingObservable().subscribe((resp) => {
 		//console.log('Logout clear watching then logout');
		//console.log(resp);
       const headers = new Headers({ 'Content-Type': 'application/json' , Auth: this.token});
       const options = new RequestOptions({ headers: headers });


	this.http.delete('/api/v1/logout', options).subscribe((resp) => {
		//console.log('Resp from logout endpoint');
		//console.log(resp);

		this.token = '';

            }, (err) => {
		//console.log('Response err from logout endpoint');
		//console.log(err);

		}, () => {
		    //console.log('logout endpoint subscribe complete');
			});


     }, (err) => {
		//console.log('Logout clear watching then logoutERR');
		//console.log(err);

     }, () => {});

    //Destroy Token on server
  }

  forgotPW(usernameoremail: string){


    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
       return this.http.post('/api/v1/forgotPW', {usernameoremail: usernameoremail}, options).map((resp) => {
		return resp;
	}).catch((err) => {
		//console.log('Catch Error in the login..');
		//console.log(err);

		return Observable.throw(err);

	});


  }

  setNewPassword(newpw: string){

   const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.token});
    const options = new RequestOptions({ headers: headers });
       return this.http.put('/api/v1/user/pwreset', {password: newpw}, options).map((resp) => {
		return resp;
	}).catch((err) => {
		//console.log('Catch Error in the login..');
		//console.log(err);

		return Observable.throw(err);

	});

  }

   confirmEmail(username: string, code: string){


    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
       return this.http.post('/api/v1/confirmEmail', {username: username, validcode: code}, options).map((resp) => {
		return resp;
	}).catch((err) => {
		//console.log('Catch Error in the login..');
		//console.log(err);

		return Observable.throw(err);

	});


  }


  userHasAvailableDevices(){

      for (let i = 0; i < this.devices.length; i++){
		if (!this.devices[i].watching){
				return true;
		}
	}
     return false;

  }

  userHasTrakingDevices(){


      for (let i = 0; i < this.devices.length; i++){
		if (this.devices[i].watching){
				return true;
		}
	}
     return false;

  }


 clearWatching(){
  for (let i = 0; i < this.devices.length; i++){
	this.devices[i].watching = false;

       }
   this.allDeviceWatching = false;

       this.deviceService.turnOffAllWatching(this.token).subscribe((resp) => {
		//console.log('Header Clear watching');
		//console.log(resp);
			this.router.navigate(['/dashboard']);

	}, (err) => {}, () => {});


  }

  clearWatchingObservable(){
  for (let i = 0; i < this.devices.length; i++){
	this.devices[i].watching = false;

       }

      return  this.deviceService.turnOffAllWatching(this.token);

  }



}
