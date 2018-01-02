import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formCenter = 0;
  loginError = '';

  constructor(private router: Router, private userService: UserService, private global: GlobalService) { }

  ngOnInit() {

	//console.log('Globals');

	this.formCenter = this.calculateFormCenter();

	this.global.onWindowChange.subscribe((data: object) => {
		//console.log(data);
		this.formCenter = this.calculateFormCenter();
	});

  }

  calculateFormCenter(){
	let offset = (this.global.screenHeight - 300) / 2 - 150;
	if (offset < 0){
		offset = 0;
         }
	return offset;
  }


   onSignup(form: NgForm) {
    const usernameoremail = form.value.usernameoremail;
    const password = form.value.password;

      this.userService.login(usernameoremail, password).subscribe((resp) => {

		//console.log('-- login response');
		//console.log(resp);

		 this.router.navigate(['/dashboard']);

	}, (err) => {

		//console.log(' -- login ERR');
		//console.log(err);
		 this.loginError = 'Error with login username/password combination';
		setTimeout(() => {
			//console.log('This');
			//console.log(this);

			this.loginError = '';

		}, 2000);

	}, () => {

		//console.log(' Nested Signup success  -- login observable complete');

	});







  }



 gotoRegister(){
	this.router.navigate(['/register']);
 }
}
