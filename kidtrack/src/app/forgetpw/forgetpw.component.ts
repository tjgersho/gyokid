import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-forgetpw',
  templateUrl: './forgetpw.component.html',
  styleUrls: ['./forgetpw.component.css']
})
export class ForgetpwComponent implements OnInit {

 formCenter: number = 0;

  constructor(private router: Router, private userService: UserService, private global: GlobalService) { }
		
  ngOnInit() {

	console.log('Globals');
	
	this.formCenter = this.calculateFormCenter();

	this.global.onWindowChange.subscribe((data: object) => {
		console.log(data);
		this.formCenter = this.calculateFormCenter();
	});

  }

  calculateFormCenter(){
	var offset = (this.global.screenHeight-250)/2 - 70;
	if(offset < 0){
		offset = 0;
         }
	return offset;
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
	


}
