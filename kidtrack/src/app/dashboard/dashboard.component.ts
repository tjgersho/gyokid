import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';

import { TruncatePipe } from '../truncate.pipe';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  regDeviceAccordOpen: boolean = true;
  dataCredAccordOpen: boolean = true;

  constructor(private user: UserService) { }

  ngOnInit() {
  }


 accordOpenCloseButton(){
	if(this.regDeviceAccordOpen){
		return {'glyphicon-minus': true};
	}else{
		return {'glyphicon-plus': true};
	}	
	
 }

 accordOpenClose(){
	
	if(this.regDeviceAccordOpen){
		return {'in': true};
	}else{
		return {'in': false};
	}	
 }

 openCloseDeviceAccordian(){
	this.regDeviceAccordOpen?this.regDeviceAccordOpen=false:this.regDeviceAccordOpen=true;
  }


 
 dataCredAccordOpenCloseButton(){
	if(this.dataCredAccordOpen){
		return {'glyphicon-minus': true};
	}else{
		return {'glyphicon-plus': true};
	}	
	
 }

 dataCredAccordOpenClose(){
	
	if(this.dataCredAccordOpen){
		return {'in': true};
	}else{
		return {'in': false};
	}	
 }

 dataCredOpenCloseDeviceAccordian(){
	this.dataCredAccordOpen?this.dataCredAccordOpen=false:this.dataCredAccordOpen=true;
  }


 trackingStatusImg(bool:boolean){
	if(bool){
		return 'assets/signalon.png';
	}else{
		return 'assets/signaloff.png';
	}
 }





}
