import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../../services/user.service';



declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users: object[] = []
  constructor(private http: Http, private user: UserService) { }

  ngOnInit() {
	this.getUsers();

  }
 
  getUsers(){


        let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        let options = new RequestOptions({ headers: headers });


	this.http.get('/api/v1/admin/users', options).subscribe((resp) => {
		console.log('Response from getting admin users');
		console.log(resp);
		console.log(resp.json());
		this.users = resp.json();


	}, (err) => {
		console.log('Error getting users');
		console.log(err);
	
	}, () =>{});

  }



  deleteUser(id: number){

	console.log('Delete user');
	console.log(id);

                let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        let options = new RequestOptions({ headers: headers });

	this.http.delete('/api/v1/admin/user/'+ id, options).subscribe((resp) => {
		console.log('Response from getting admin users');
		console.log(resp);
		console.log(resp.json());
		this.getUsers();


	}, (err) => {
		console.log('Error getting users');
		console.log(err);
	
	}, () =>{});


   }



  updateUser(id, data){

	let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        let options = new RequestOptions({ headers: headers });

	console.log('Data in ping credit update');

	this.http.put('/api/v1/admin/user/'+ id, data, options).subscribe((resp) => {
		console.log('Response from updating admin users');
		console.log(resp);
		console.log(resp.json());
		


	}, (err) => {
		console.log('Error getting users');
		console.log(err);
		this.getUsers();
	}, () =>{});

  }

  updateUserPingCredits(user){


     	console.log('update ping credits user');
	console.log(user);
	
	let data = {pingCredits: user.pingCredits};

	this.updateUser(user.id, data);


  }


  updateUserWins(user){


      	console.log('update ping credits user');
	console.log(user);
	
       let data = {referralWins: user.referralWins};
       this.updateUser(user.id, data);
   
   }


}
