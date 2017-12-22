import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

     params: object;

     loading = true;

     emailConfirmed = false;

   constructor(private route: ActivatedRoute, private router: Router, private user: UserService) { }

  ngOnInit() {
	console.log('IN confirm email');
	console.log(this.route);

	this.params = this.route.snapshot.params;

	console.log('URL PARAMS in confirm email');
	console.log(this.params);


       this.route.params.subscribe(params => {

        const username = params['username']; // (+) converts string 'id' to a number
        const code = params['code'];
        // In a real app: dispatch action to load the details here.
   	console.log('Params in observable');
	console.log(params);
	console.log('username');
	console.log(username);
	console.log('code');
	console.log(code);


	this.user.confirmEmail(username, code).subscribe((resp) => {
		console.log('Resp');
		console.log(resp);
		console.log('this.user');
		console.log(this.user);
		this.loading = false;
		this.emailConfirmed = true;

	}, (err) => {

		console.log('err on user login');
		console.log(err);
		this.loading = false;
		this.emailConfirmed = false;
	}, () => {

      });


 });


  }
}
