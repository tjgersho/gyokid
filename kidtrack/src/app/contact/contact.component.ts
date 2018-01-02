import { Component, OnInit,  ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

declare var jquery: any;
declare var $: any;

declare var grecaptcha: any;


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

   captchaChecked = false;
   captchaResponse = '';
   captchaWidgetId: number;
   reCap: any;
   captachErrors = '';

  constructor(private http: Http) {


	//console.log('Contact us Constructor!');


  }

  ngOnInit() {
	//console.log('Contact us NGONINIT');

  }


   resolved(captchaResponse: string) {
        //console.log(`Resolved captcha with response ${captchaResponse}:`);

	   this.captchaChecked = true;
   	this.captchaResponse = captchaResponse;
    }


  onSignup(form: NgForm) {


	//console.log('SUbmint captcha.value');
	//console.log(this.captchaResponse);

     if (this.captchaResponse.length > 0){

	//console.log(form);
	//console.log('name');
	//console.log(form.value.contact_name);
	//console.log(form.value.contact_email);
	//console.log(form.value.contact_comment);

	const data = {name: form.value.contact_name,
		   email: form.value.contact_email,
		   comment: form.value.contact_comment,
                    gRecaptchaResponse:  this.captchaResponse};


        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

	this.http.post('/api/v1/contact', data, headers).subscribe((resp: Response) => {

		//console.log('Comment Response');
		//console.log(resp);
		//console.log(resp.json());
                $('#contactUsthanks').modal('toggle');

		   form.reset();


                   grecaptcha.reset();

              		this.captchaChecked = false;





	}, (err) => {

		//console.log('Comment Err');
		//console.log(err);

                   grecaptcha.reset();

		this.captchaChecked = false;

	}, () => {

		//console.log('Comment Complete');

                   grecaptcha.reset();

		this.captchaChecked = false;

	});

      }else{
	this.captachErrors = 'Please check the Captcha Box to proove you\'re a human.';
	setTimeout(function(){
		this.captachErrors = '';
	}, 3000);

      }


   }


}
