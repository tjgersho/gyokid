import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Router} from '@angular/router';
import { UserService } from './user.service';

import { Observable } from 'rxjs/Observable';




@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private user: UserService, private router: Router){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

	const self = this;
	console.log('In Can Activate for AuthGuardService');

	return new Promise(function(resolve, reject){

		 self.user.getUserFromToken().then(function(resp){

			console.log('In Can Activate.. isValidUser Response');
			console.log(resp);

			if (resp){

				 resolve(true);
			}else{

				 self.router.navigate(['/']);
	     			 resolve(false);

			}

		}, function(err){
			 self.router.navigate(['/']);
			 resolve(false);

	     });

	  });

  }

}
