import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class UserService {
  
  isLoggedIn: boolean = false;

  constructor(private router: Router) {

  

  }


  login(){
	this.isLoggedIn = true;
	this.router.navigate(['/tracker']);

  }

  logout(){

      this.isLoggedIn = false;
     this.router.navigate(['/']);
  }



}
