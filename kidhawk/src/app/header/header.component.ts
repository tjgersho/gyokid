import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';


declare var jquery:any;
declare var $ :any;


@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.css']
})



export class HeaderComponent {

 atIndex: boolean = true;

 constructor(private route:ActivatedRoute){
	console.log(route.snapshot.url.length);

	if(route.snapshot.url.length > 0){
		this.atIndex = false;
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
}) }

}