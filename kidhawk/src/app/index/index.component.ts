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
	

    }

  ngOnInit() {

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

  }



  
}
