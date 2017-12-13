import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  emails: object[] = [];

   limit:number = 50;
  page:number = 0
  order:string = '';
  numPages:number = 0;

  constructor(private http: Http, private user: UserService) {

     this.setNumberOfPages().subscribe((resp) =>{
	   console.log('setNumPages in admin user');
	    console.log(resp);
		 this.numPages = Math.ceil(resp.json()/this.limit);
        },(err)=>{console.log('Setting Num Pages in admin user err'); console.log(err);}, ()=>{});



  }

  ngOnInit() {
	this.getEmails();

  }
 
  getEmails(){


        let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        let options = new RequestOptions({ headers: headers });

	let getEmailURL = '/api/v1/admin/emails?limit=' + this.limit + '&page=' + this.page + '&order=' + this.order;

	this.http.get(getEmailURL, options).subscribe((resp) => {
		console.log('Response from getting admin emails');
		console.log(resp);
		console.log(resp.json());
		this.emails = resp.json();


	}, (err) => {
		console.log('Error getting emails');
		console.log(err);
	
	}, () =>{});

  }



 
  setNumberOfPages(){

	       let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
               let options = new RequestOptions({ headers: headers });
		return this.http.get('/api/v1/admin/emailpagecount', options);

   }

  onPageChange(pg:number){

	console.log('EVENT EMITTER>>> for page change in the admin user pag cntrl');
	console.log(pg);
	
	this.page = pg;
	this.getEmails();
  }



  deleteEmail(id: number){

	console.log('Delete Email');
	console.log(id);

                let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        let options = new RequestOptions({ headers: headers });

	this.http.delete('/api/v1/admin/email/'+ id, options).subscribe((resp) => {
		console.log('Response from getting admin emails');
		console.log(resp);
		console.log(resp.json());
		this.getEmails();


	}, (err) => {
		console.log('Error getting emails');
		console.log(err);
	
	}, () =>{});


   }


}
