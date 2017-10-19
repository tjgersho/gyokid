import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 

  formCenter: number = 0;


  constructor(private router: Router, private userService: UserService,  private global: GlobalService) { }

  ngOnInit() {
	console.log('Globals');
	
	this.formCenter = this.calculateFormCenter();

	this.global.onWindowChange.subscribe((data: object) => {
		console.log(data);
		this.formCenter = this.calculateFormCenter();
	});

  }

  calculateFormCenter(){
	var offset = (this.global.screenHeight-430)/2 - 70;
	if(offset < 0){
		offset = 0;
         }
	return offset;
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
