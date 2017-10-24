import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

import { AdminService } from '../admin.service';

declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userArray: User[] = [];
  loading: boolean = false;

  constructor(private admin: AdminService) { 
  	var self = this;

         this.loading = true;

  	 this.admin.getUsers().then(function(users){
  	 		console.log('Got Users');
  	 		console.log(users);
  	 	self.userArray = users;
  	 	        self .loading = false;

  	 },function(err){
  	 	console.log('Error Getting devices');
  	 	console.log(err);
  	 	         self .loading = false;
  	 });

   }

  ngOnInit() {
  }

}
