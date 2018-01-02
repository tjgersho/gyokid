import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';


declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-forgetpw',
  templateUrl: './forgetpw.component.html',
  styleUrls: ['./forgetpw.component.css']
})
export class ForgetpwComponent implements OnInit {

 formCenter = 0;
 forgetPwError = '';

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
	let offset = (this.global.screenHeight - 250) / 2 - 70;
	if (offset < 0){
		offset = 0;
         }
	return offset;
  }


  forgetPwEmailSentOk(){

  $('#forgetPasswordModal').modal('hide');

     this.router.navigate(['/login']);

   }


   onSubmit(form: NgForm) {
       const usernameoremail = form.value.usernameoremail;
	//console.log('Username or email');
	//console.log(usernameoremail);

      this.userService.forgotPW(usernameoremail).subscribe((res) => {
          	//console.log('Response from subscribe to user server signup method');
		//console.log(res);
                       $('#forgetPasswordModal').modal('toggle');

          }, (err) => {

		this.forgetPwError = 'There was an error finding your username/email in our system.';
		setTimeout(function(){
			this.forgetPwError = '';
		}, 3000);


	}, () => {
		//console.log('Subscribe finished..');


	});


  }



}
