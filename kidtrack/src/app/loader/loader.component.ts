import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';



@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
 showLoader = true;
  constructor(private router: Router) {


      router.events.subscribe( (event: Event) => {

		console.log('Router Event');
		console.log(event);
            if (event instanceof NavigationStart) {
                // Show loading indicator
		this.showLoader = true;
            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator
               this.showLoader = false;
            }

            if (event instanceof NavigationCancel) {
                // Hide loading indicator
               this.showLoader = false;
            }


            if (event instanceof NavigationError) {
                // Hide loading indicator
                // Present error to user
                console.log(event.error);
            }
        });


   }

  ngOnInit() {

  }


 toggleLoader(){
	this.showLoader ? this.showLoader = false : this.showLoader = true;

 }

}
