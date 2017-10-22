import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Router} from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AdminGuardService implements CanActivate {
 
  constructor(private user: UserService, private router:Router){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 


	console.log('CanActivate Admin');

	if(this.user.isAdmin){

	      return true;

        }else{

	      this.router.navigate(['/']);
	      return false;
        }
	
  }

}
