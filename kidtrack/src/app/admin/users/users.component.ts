import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../../services/user.service';



declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users: object[] = [];

  limit = 50;
  page = 0;
  order = '';
  numPages = 0;


  constructor(private http: Http, private user: UserService) { }

  ngOnInit() {
	this.getUsers();

	this.setNumberOfPages().subscribe((resp) => {
			//console.log('setNumPages in admin user');
			//console.log(resp);
				this.numPages = Math.ceil(resp.json() / this.limit);
                 }, (err) => {
                   //console.log('Setting Num Pages in admin user err'); 
                   //console.log(err); 
                 }, () => {});


  }

  getUsers(){


        const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        const options = new RequestOptions({ headers: headers });

	const getUserUrl = '/api/v1/admin/users?limit=' + this.limit + '&page=' + this.page + '&order=' + this.order;



	this.http.get(getUserUrl, options).subscribe((resp) => {
		//console.log('Response from getting admin users');
		//console.log(resp);
		//console.log(resp.json());
		this.users = resp.json();


	}, (err) => {
		//console.log('Error getting users');
		//console.log(err);

	}, () => {});

  }

   setNumberOfPages(){

	       const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
               const options = new RequestOptions({ headers: headers });
		return this.http.get('/api/v1/admin/userspagecount', options);

   }

  onPageChange(pg: number){
	//console.log('EVENT EMITTER>>> for page change in the admin user pag cntrl');
	//console.log(pg);

	this.page = pg;
	this.getUsers();
  }


  deleteUser(id: number){

	//console.log('Delete user');
	//console.log(id);

                const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        const options = new RequestOptions({ headers: headers });

	this.http.delete('/api/v1/admin/user/' + id, options).subscribe((resp) => {
		//console.log('Response from getting admin users');
		//console.log(resp);
		//console.log(resp.json());
		this.getUsers();


	}, (err) => {
		//console.log('Error getting users');
		//console.log(err);

	}, () => {});


   }



  updateUser(id, data){

	const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        const options = new RequestOptions({ headers: headers });

	//console.log('Data in ping credit update');

	this.http.put('/api/v1/admin/user/' + id, data, options).subscribe((resp) => {
		//console.log('Response from updating admin users');
		//console.log(resp);
		//console.log(resp.json());



	}, (err) => {
		//console.log('Error getting users');
		//console.log(err);
		this.getUsers();
	}, () => {});

  }

  updateUserPingCredits(user){


     	//console.log('update ping credits user');
	//console.log(user);

	const data = {pingCredits: user.pingCredits};

	this.updateUser(user.id, data);


  }


  updateUserWins(user){


      	//console.log('update ping credits user');
	//console.log(user);

       const data = {referralWins: user.referralWins};
       this.updateUser(user.id, data);

   }




}
