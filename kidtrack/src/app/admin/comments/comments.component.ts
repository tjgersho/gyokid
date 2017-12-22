import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: object[] = [];


  limit = 50;
  page = 0;
  order = '';
  numPages = 0;


  constructor(private http: Http, private user: UserService) {

    this.setNumberOfPages().subscribe((resp) => {
	   console.log('setNumPages in admin user');
	    console.log(resp);
		 this.numPages = Math.ceil(resp.json() / this.limit);
        }, (err) => {console.log('Setting Num Pages in admin user err'); console.log(err); }, () => {});




   }

  ngOnInit() {
	this.getComments();

  }

  getComments(){

        const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        const options = new RequestOptions({ headers: headers });
         const getCommentsURL = '/api/v1/admin/comments?limit=' + this.limit + '&page=' + this.page + '&order=' + this.order;

	this.http.get(getCommentsURL, options).subscribe((resp) => {
		console.log('Response from getting admin comments');
		console.log(resp);
		console.log(resp.json());
		this.comments = resp.json();


	}, (err) => {
		console.log('Error getting comments');
		console.log(err);

	}, () => {});

  }

   setNumberOfPages(){

	       const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
               const options = new RequestOptions({ headers: headers });
		return this.http.get('/api/v1/admin/commentspagecount', options);

   }

  onPageChange(pg: number){

	console.log('EVENT EMITTER>>> for page change in the admin user pag cntrl');
	console.log(pg);

	this.page = pg;
	this.getComments();
  }



  deleteComment(id: number){

	console.log('Delete Comment');
	console.log(id);

                const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        const options = new RequestOptions({ headers: headers });

	this.http.delete('/api/v1/admin/comment/' + id, options).subscribe((resp) => {
		console.log('Response from getting admin comments');
		console.log(resp);
		console.log(resp.json());
		this.getComments();


	}, (err) => {
		console.log('Error getting comments');
		console.log(err);

	}, () => {});


   }


}
