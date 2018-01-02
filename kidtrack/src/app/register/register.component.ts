import { Component, OnInit , ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  params: object;


  formCenter = 0;
  username = '';
  email = '';
  password = '';
  signupError = '';
  loading = false;

  referralCode = '';


  constructor(private router: Router, private route: ActivatedRoute, private user: UserService,  private global: GlobalService) { }

  ngOnInit() {
	////console.log('Globals');

	this.formCenter = this.calculateFormCenter();

	this.global.onWindowChange.subscribe((data: object) => {
		////console.log('Global on window change subscribe in register');
		////console.log(data);
		this.formCenter = this.calculateFormCenter();
	});


      this.params = this.route.snapshot.params;

	////console.log('URL PARAMS in confirm email');
	////console.log(this.params);


  this.route.queryParams.subscribe(params => {

	////console.log('Query param... code ?');
	////console.log(params);

	if (params.hasOwnProperty('code')){

   		 this.referralCode =  params['code'];

         }
    	////console.log(this.referralCode);


      });

  }

  calculateFormCenter(){
	let offset = (this.global.screenHeight - 430) / 2 - 120;
	if (offset < 0){
		offset = 0;
         }
	return offset;
  }


   onSignup(form: NgForm) {

     this.loading = true;

	////console.log(form);
	////console.log('password');
////console.log(form.value.password);

this.password = form.value.password;
this.username = form.value.username;
this.email = form.value.email;

////console.log(this.password);
////console.log(this.username);
////console.log(this.email);




  this.user.signup(this.username, this.email, this.password, this.referralCode).subscribe((resp) => {

    ////console.log('Signup response');
      ////console.log(resp);
      this.user.login(this.username, this.password).subscribe((resp) => {

		////console.log(' Nested Signup success  -- login response');
		////console.log(resp);
               this.loading = false;
		 this.router.navigate(['/dashboard']);

	}, (err) => {

		////console.log(' Nested Signup success  -- login ERR');
		////console.log(err);
                    this.loading = false;
	}, () => {

		////console.log(' Nested Signup success  -- login observable complete');
		  this.loading = false;
	});

  }, (err) => {

    ////console.log('Error on signup req.');
      ////console.log(err);
	////console.log(err.json());
	const error = err.json();


	for (let i = 0; i < error.errors.length; i++){
	        if (i > 0){
		this.signupError += '<br />';
		}

		////console.log(error.errors[i].message);

		if (error.errors[i].message === 'email must be unique'){
			 this.signupError += 'Email already registered. Please select another or reset your password.';
		}

		if (error.errors[i].message === 'username must be unique'){
		    this.signupError += 'Username already registered. Please select another or reset your password.';
		}


	}

	 setTimeout(() => {

			this.signupError = '';

		}, 3000);

           this.loading = false;
  }, () => {
    ////console.log('signup request complete..');

     this.loading = false;
  });




  }



 gotoLogin(){
	this.router.navigate(['/login']);
 }

}
