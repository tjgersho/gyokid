import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: object[] = []
  constructor(private http: Http, private user: UserService) { }

  ngOnInit() {
	this.getComments();

  }
 
  getComments(){

        let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        let options = new RequestOptions({ headers: headers });

	this.http.get('/api/v1/admin/comments', options).subscribe((resp) => {
		console.log('Response from getting admin comments');
		console.log(resp);
		console.log(resp.json());
		this.comments = resp.json();


	}, (err) => {
		console.log('Error getting comments');
		console.log(err);
	
	}, () =>{});

  }



  deleteComment(id: number){

	console.log('Delete Comment');
	console.log(id);

                let headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        let options = new RequestOptions({ headers: headers });

	this.http.delete('/api/v1/admin/comment/'+ id, options).subscribe((resp) => {
		console.log('Response from getting admin comments');
		console.log(resp);
		console.log(resp.json());
		this.getComments();


	}, (err) => {
		console.log('Error getting comments');
		console.log(err);
	
	}, () =>{});


   }


}
