import { Component, OnInit } from '@angular/core';

declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {



  constructor() { 
	
	//global.onWindowChange.subscribe((w)=>{
	//	console.log("On window change global observable in index");
	//	console.log(w);
        //});
    }

  ngOnInit() {

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

  }


  




  
}
