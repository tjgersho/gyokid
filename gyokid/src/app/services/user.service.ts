import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from './user.model';

@Injectable()
export class UserService {
  
  isLoggedIn: boolean = false;

  constructor(private router: Router, private http: Http) {

  
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
  
	this.isLoggedIn = true;
	this.router.navigate(['/tracker']);

  }

  logout(){

      this.isLoggedIn = false;
      this.router.navigate(['/']);
  }



}
