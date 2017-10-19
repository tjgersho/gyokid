import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';


declare var jquery:any;
declare var $ :any;


@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.css']
})



export class HeaderComponent implements OnInit, OnChanges{

 atIndex: boolean = true;
 atTrack: boolean = false;
 atRegister: boolean = false;
 atLogin: boolean = false;
 
 mobileNavOpen: boolean = false;

 constructor(private route: ActivatedRoute, private user: UserService, private router: Router){
	console.log(route.url);

	if(route.snapshot.url.length > 0){
		this.atIndex = false;
		if(route.snapshot.url[0].path === 'tracker'){
                   this.atTrack = true;
                }
		if(route.snapshot.url[0].path === 'register'){
                   this.atRegister = true;
                }
		if(route.snapshot.url[0].path === 'login'){
                   this.atLogin = true;
                }
	
	}


 }

 ngOnChanges(changes: SimpleChanges){
	console.log('ngOnChanges Called');
	console.log(changes);

	 if(this.route.snapshot.url.length > 0){
	    this.atIndex = false;
		if(this.route.snapshot.url[0].path === 'tracker'){
                   this.atTrack = true;
                }else{
                  this.atTrack = false;
                }

                if(this.route.snapshot.url[0].path === 'register'){
                   this.atRegister = true;
                }else{
                  this.atRegister = false;
                }
	}else{
          this.atIndex = true;
        }
  }

 ngOnInit() {


$('[data-spy="affix"]').affix({
  offset: {
    top: 380,
    bottom: function () {
      return (this.bottom = $('.footer').outerHeight(true))
    }
  }
}) 

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