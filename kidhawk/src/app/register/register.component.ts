import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

   onSignup(form: NgForm) {
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const password2 = form.value.password2;

    if(password === password2){
      this.userService.signup(username, email, password).subscribe((res) => {

		console.log('Response from subscribe to user server signup method');
		console.log(res);

		if( res.status === 200){
			this.userService.login(username, password);
               		//this.router.navigate(['/tracker']);
                 }else{
			alert('An error occured while signing up.');

                }
		
      });

    }
  }



 gotoLogin(){
	this.router.navigate(['/login']);
 }

}
