import { Component, OnInit } from '@angular/core';



declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userArray: object  = [];
  loading: boolean = false;

  constructor() { 
  	var self = this;



  	
   }

  ngOnInit() {
  }

}
