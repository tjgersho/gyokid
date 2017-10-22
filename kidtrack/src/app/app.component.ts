import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GyoKid';

	constructor(private global: GlobalService){}
	@HostListener('window:resize', ['$event'])
	 onResize(event) {
  		this.global.updateWindowDimensions()
	 }

}
