import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

	
   onSignup(form: NgForm) {
    const usernameoremail = form.value.usernameoremail;
    const password = form.value.password;

      this.userService.login(usernameoremail, password)



     //.subscribe((res) => {

	//	console.log('Response from subscribe to user server signup method');
	//	console.log(res);

	//	if( res.status === 200){
	//		this.userService.login();
               		//this.router.navigate(['/tracker']);
          //       }else{
	//		alert('An error occured while signing up.');

          //      }
		
      //});

   
  }
	


 gotoRegister(){
	this.router.navigate(['/register']);
 }
}
