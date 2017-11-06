import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  emails: object[] = []
  constructor(private http: Http, private user: UserService) { }

  ngOnInit() {
	this.getEmails();

  }
 
  getEmails(){


        let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        let options = new RequestOptions({ headers: headers });


	this.http.get('/api/v1/admin/emails', options).subscribe((resp) => {
		console.log('Response from getting admin emails');
		console.log(resp);
		console.log(resp.json());
		this.emails = resp.json();


	}, (err) => {
		console.log('Error getting emails');
		console.log(err);
	
	}, () =>{});

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
