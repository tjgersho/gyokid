import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

 params: object;
 changePwError: string = '';
 password: string;
 password2: string;

  constructor(private route: ActivatedRoute, private router: Router, private user: UserService) { }

  ngOnInit() {

         console.log('IN confirm email');
	console.log(this.route);

	this.params = this.route.snapshot.params;

	console.log('URL PARAMS in confirm email');
	console.log(this.params);


  this.route.params.subscribe(params => {
       const username = params['name']; // (+) converts string 'id' to a number
       const code = params['code'];
       // In a real app: dispatch action to load the details here.
   	console.log('Params in observable');
	console.log(params);
	console.log('username');
	console.log(username);
	console.log('code');
	console.log(code);


	this.user.login(username, code).subscribe((resp) => {
		console.log('Resp');
		console.log(resp);
		console.log('this.user');
		console.log(this.user);
		this.user.getUserFromToken();

	},(err) => {

		console.log('err on user login');
		console.log(err);

	}, () => {

	});


 });

  }

 passwordsMatch(form: NgForm) {

	console.log('PASSWORDS ');
	console.log(this.password, this.password2);

	if(this.password !== this.password2){
		return false;
	}else{
		return true;
	}

 }


  onSubmit(form: NgForm) {

        const newpassword = form.value.password;
	console.log('new Password');
	console.log(newpassword);
	
	this.user.setNewPassword(newpassword).subscribe((resp) =>{

		console.log('Reset password success resp');
		console.log(resp);

              $('#passwordResetModal').modal({
		backdrop: 'static',
  		keyboard: false});

		$('#passwordResetModal').modal('show');

	},(err) =>{
		console.log('Reset Password Err');
		console.log(err);
		this.changePwError = "There was an error in updating your password.  You may need to get a new reset password email.";

	}, () => {console.log('reset password observable complete');});



  }


  passwordChangedOk(){

  $('#passwordResetModal').modal('hide');

     this.router.navigate(['/dashboard']);

   }

}
