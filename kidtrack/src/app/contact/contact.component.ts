import { Component, OnInit , ViewChild, NgZone} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

declare var jquery:any;
declare var $ :any;
declare var grecaptcha: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

   captchaChecked: boolean = false;

  constructor(private http: Http, private zone: NgZone) {

	 window['verifyCaptchaCallback'] = this.verifyCaptchaCallback.bind(this);

  }

  ngOnInit() {
	console.log('Contact us NGONINIT');
	console.log(grecaptcha);

    grecaptcha.reset();


  }

   isCaptchaChecked() {

		console.log('this in isCaptchaChecked');
	console.log(this);

	console.log('isCaptchaChecked');
	console.log(grecaptcha && grecaptcha.getResponse().length !== 0);
       if(grecaptcha && grecaptcha.getResponse().length !== 0){
		console.log('This captchaChecked');
		this.captchaChecked = true;
	}else{

               console.log('This captchaChecked - false');
		this.captchaChecked = false;

	}

       
   }

   verifyCaptchaCallback(response){
	console.log('captcha callback');
	console.log(response);
        this.zone.run(() =>  this.isCaptchaChecked());
   }

  onSignup(form: NgForm) {

	var captcha = $('#g-recaptcha-response');

	console.log(form);
	console.log('name');
	console.log(form.value.contact_name);
	console.log(form.value.contact_email);
	console.log(form.value.contact_comment);
	
	let data = {name: form.value.contact_name,
		   email: form.value.contact_email,
		   comment: form.value.contact_comment,
                    gRecaptchaResponse:  captcha.val()};

	
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

	this.http.post("/api/v1/contact", data, headers).subscribe((resp: Response) => {

		console.log("Comment Response");
		console.log(resp);
		console.log(resp.json());
                $('#contactUsthanks').modal('toggle');

		form.reset();
                grecaptcha.reset();

           
		
	}, (err) => {
             
		console.log("Comment Err");
		console.log(err);
		 grecaptcha.reset();
		
	}, () => {

		console.log("Comment Complete");
		 grecaptcha.reset();
		
	});


   }
  

}
