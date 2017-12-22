import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Router} from '@angular/router';
import { UserService } from './user.service';

import { Observable } from 'rxjs/Observable';




@Injectable()
export class AuthPingGuardService implements CanActivate {

  constructor(private user: UserService, private router: Router){}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

	const self = this;
	console.log('In Can Activate for AuthGuardService');

	return new Promise(function(resolve, reject){

		 self.user.getUserFromToken().then(function(user: UserService){

			console.log('In Can Activate.. isValidUser Response');
			console.log(user);

			if (user && user.pingCredits > 0){

				 resolve(true);
			}else if (user){

				 self.router.navigate(['/dashboard']);
	     			 resolve(false);

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
