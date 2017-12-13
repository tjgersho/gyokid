import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { GlobalService } from './services/global.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KidTrack';

	constructor(private global: GlobalService, private router: Router){
			
	   global.onWindowChange.subscribe((w)=>{
		console.log("On window change global observable in index");
		console.log(w);
            });
           
         router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
             }
            window.scrollTo(0, 0)
          });
		
	}
	@HostListener('window:resize', ['$event'])
	 onResize(event) {
  		this.global.updateWindowDimensions()
	 }

}
