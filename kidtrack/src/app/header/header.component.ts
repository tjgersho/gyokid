import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { DeviceService } from '../services/device.service';


declare var jquery: any;
declare var $: any;


@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit{

 atIndex = true;
 atTrack = false;
 atRegister = false;
 atLogin = false;
 atDash = false;
 navBox: HTMLElement;
 mobileNavOpen = false;

last_known_scroll_position = 0;
ticking = false;
navAffixed = true;

 constructor(private route: ActivatedRoute, public user: UserService, private router: Router, private deviceService: DeviceService){

	route.url.subscribe((r) => {
		//console.log('Route subscribe in header Response');
		//console.log(r);
		this.setHeaderState();

	   }, (e) => {
			//console.log('Route Subscribe in header ERR');
		//console.log(e);

	   }, () => {
		//console.log('Route Subscribe in header complete');


         });

 }


 setHeaderState(){

 	 if (this.route.snapshot.url.length > 0){

		if (this.route.snapshot.url[0].path === 'tracker'){
                   this.atTrack = true;

                }else{
                  this.atTrack = false;

                }

               	if (this.route.snapshot.url[0].path === 'dashboard'){
                   this.atDash = true;

                }else{
                  this.atDash = false;

                }
                if (this.route.snapshot.url[0].path === 'login'){
                   this.atLogin = true;

                }else{
                  this.atLogin = false;


                }

                if (this.route.snapshot.url[0].path === 'register'){
                   this.atRegister = true;

                }else{
                  this.atRegister = false;


                }
		 this.atIndex = false;
	}else{
          this.atIndex = true;
        }
}



ngOnInit(){


   this.navBox = document.getElementById('navBox');

  if (this.route.snapshot.url.length > 0){
     this.navBox.style.position = 'fixed';
      this.navAffixed = true;
    }else{
      this.navBox.style.position = 'relative';
      this.navAffixed = false;
    }
 const self = this;
 window.addEventListener('scroll', function(e) {

  self.last_known_scroll_position = window.scrollY;

  if (!self.ticking) {

    window.requestAnimationFrame(function() {
      self.adjustNavBox();
      self.ticking = false;
    });

    self.ticking = true;

  }

});

  $('[data-toggle="tooltip"]').tooltip();

}





adjustNavBox() {


  // do something with the scroll position

  if (this.route.snapshot.url.length < 1 && this.last_known_scroll_position < 380){
     this.navBox.style.position = 'relative';
     this.navAffixed = false;
    }else{
      if (this.navBox.style.position === 'relative'){
        this.navBox.style.position = 'fixed';
         this.navAffixed = true;
      }
    }

}




onHamburgerClick(){

	this.mobileNavOpen ? this.mobileNavOpen = false : this.mobileNavOpen = true;

}



logout(){
 this.user.logout();

}

goTrack(){
 this.router.navigate(['/tracker']);
}





}
