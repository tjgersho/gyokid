import { Component, OnInit , ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   
  formCenter: number = 0;
  username: string = "";
  email: string = "";
  password: string = "";


  constructor(private router: Router, private user: UserService,  private global: GlobalService) { }

  ngOnInit() {
	console.log('Globals');
	
	this.formCenter = this.calculateFormCenter();

	this.global.onWindowChange.subscribe((data: object) => {
		console.log('Global on window change subscribe in register');
		console.log(data);
		this.formCenter = this.calculateFormCenter();
	});

  }

  calculateFormCenter(){
	var offset = (this.global.screenHeight-430)/2 - 100;
	if(offset < 0){
		offset = 0;
         }
	return offset;
  }


   onSignup(form: NgForm) {

	console.log(form);
	console.log('password');
console.log(form.value.password);

this.password = form.value.password;
this.username = form.value.username;
this.email = form.value.email;

console.log(this.password);
console.log(this.username);
console.log(this.email);

  this.user.signup(this.username, this.email, this.password).subscribe((resp) => {

    console.log('Signup response');
      console.log(resp);
      this.user.login(this.username, this.password).subscribe((resp) => {

		console.log(" Nested Signup success  -- login response");
		console.log(resp);

		 this.router.navigate(['/dashboard']);

	}, (err) => {
             
		console.log(" Nested Signup success  -- login ERR");
		console.log(err);

	}, () => {

		console.log(" Nested Signup success  -- login observable complete");
			
	});

  }, (err) => {

    console.log('Error on signup req.');
      console.log(err);

  }, () => {
    console.log('signup request complete..');


  });

  }



 gotoLogin(){
	this.router.navigate(['/login']);
 }

}
