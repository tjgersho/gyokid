import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-pingsales',
  templateUrl: './pingsales.component.html',
  styleUrls: ['./pingsales.component.css']
})
export class PingsalesComponent implements OnInit {

 transactions: object[] = [];


   limit = 50;
  page = 0;
  order = '';
  numPages = 0;

  constructor(private http: Http, private user: UserService, private global: GlobalService) {

       this.setNumberOfPages().subscribe((resp) => {
	   //console.log('setNumPages in admin user');
	    //console.log(resp);
		 this.numPages = Math.ceil(resp.json() / this.limit);
        }, (err) => {
            //console.log('Setting Num Pages in admin user err'); 
            //console.log(err); 
        }, () => {});



   }

  ngOnInit() {
	this.getTransactions();
  }



 getTransactions(){

        const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        const options = new RequestOptions({ headers: headers });

	 const getSalesUrl = '/api/v1/admin/pingsales?limit=' + this.limit + '&page=' + this.page + '&order=' + this.order;


	this.http.get(getSalesUrl, options).subscribe((resp) => {
		//console.log('Response for ping sales..');
		//console.log(resp);
		//console.log(resp.json());
		this.transactions = resp.json();


	}, (err) => {
		//console.log('Error getting comments');
		//console.log(err);

	}, () => {});

  }


  setNumberOfPages(){

	       const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
               const options = new RequestOptions({ headers: headers });
		return this.http.get('/api/v1/admin/salespagecount', options);

   }

  onPageChange(pg: number){

	//console.log('EVENT EMITTER>>> for page change in the admin user pag cntrl');
	//console.log(pg);

	this.page = pg;
	this.getTransactions();
  }


  archiveTransaction(id: number){

	//console.log('Delete Transaction');
	//console.log(id);

        const headers = new Headers({ 'Content-Type': 'application/json', Auth: this.user.token});
        const options = new RequestOptions({ headers: headers });

	this.http.delete('/api/v1/admin/pingsales/' + id, options).subscribe((resp) => {
		//console.log('Response from deleting admin transaction');
		//console.log(resp);
		//console.log(resp.json());
		this.getTransactions();


	}, (err) => {
		//console.log('Error getting comments');
		//console.log(err);

	}, () => {});


   }


}
