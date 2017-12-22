import { Component, OnInit} from '@angular/core';
import { DomSanitizer , SafeResourceUrl, SafeUrl  } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare var jquery: any;
declare var $: any;

declare var twttr: any;


@Component({
  selector: 'app-referral-widget',
  templateUrl: './referral-widget.component.html',
  styleUrls: ['./referral-widget.component.css']
})
export class ReferralWidgetComponent implements OnInit {

  mailtoBody: SafeResourceUrl;
  facebookShareLink: SafeResourceUrl;
  twitterURL: SafeResourceUrl;
  referralAccordOpen = true;

  constructor(public user: UserService, private ds: DomSanitizer) {

      let bodyString = `Hey,\n\nYou should check out https://kidtrack.io, and thier GPS tracker for kids.\n
        Join using this link so I get credit for the referral:\n
         https://kidtrack.io/register?code=` + user.referralCode;

	bodyString = 'mailto:?subject=Check out Kidtrack.io&body=' + encodeURIComponent(bodyString);


//ds.bypassSecurityTrustResourceUrl();
	 this.mailtoBody = bodyString;

		console.log(this.mailtoBody);


	const twtstring = 'register?code=' + user.referralCode;

		console.log(twtstring);

         this.twitterURL = ds.bypassSecurityTrustResourceUrl(twtstring);

		console.log(this.twitterURL);

         const fbstring = 'https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fkidtrack.io%2Fregister%3Fcode%3D' + user.referralCode + '&layout=button_count&size=large&mobile_iframe=true&appId=162531991031337&width=84&height=28';
	console.log(fbstring);

         this.facebookShareLink = ds.bypassSecurityTrustResourceUrl(fbstring);

	console.log(this.facebookShareLink);
   }

  ngOnInit() {

	console.log('LAODING SHARE WIDGET!!!!');
	console.log(twttr);


        twttr.widgets.load( document.getElementById('twitterContainer') );

  }





  progressClass(){

	switch (true){

		case this.user.referralCount <= 2:
			return {'progress-bar-info' : true};



		case this.user.referralCount > 2 && this.user.referralCount <= 5:
			return {'progress-bar-success' : true};


                case this.user.referralCount > 5 && this.user.referralCount <= 10:
			return {'progress-bar-warning' : true};



                case this.user.referralCount > 10:
			return {'progress-bar-danger' : true};


	}

  }

 progVal(){
	switch (true){

		case this.user.referralCount <= 2:
			return this.user.referralCount * 25 / 2;


		case this.user.referralCount > 2 && this.user.referralCount <= 5:
			return 25 + (this.user.referralCount - 2) * 25 / 3;


                case this.user.referralCount > 5 && this.user.referralCount <= 10:
			return 50 + (this.user.referralCount - 5) * 25 / 5;


                case this.user.referralCount > 10:
			return 75 + (this.user.referralCount - 10) * 25 / 10;


         }
  }



  openReferralForm(){
	$('#GetAFriendToJoinModal').modal('show');


   }


  opeCloseReferralAccordian(){

        this.referralAccordOpen ? this.referralAccordOpen = false : this.referralAccordOpen = true;

  }

  referralAccordOpenClose(){
      if (this.referralAccordOpen){
		return {'in': true};
	}else{
		return {'in': false};
	}


  }

  referralAccordOpenCloseButton(){
     if (this.referralAccordOpen){
		return {'glyphicon-minus': true};
	}else{
		return {'glyphicon-plus': true};
	}


  }

}
