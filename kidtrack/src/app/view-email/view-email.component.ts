import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-view-email',
  templateUrl: './view-email.component.html',
  styleUrls: ['./view-email.component.css']
})
export class ViewEmailComponent implements OnInit {

 params: any;

 email: string = "";
 

  constructor(private route: ActivatedRoute, private router: Router, private http: Http) { }

  ngOnInit() {
	console.log('IN browser email init');
	console.log(this.route);

	this.params = this.route.snapshot.params;

	console.log('URL PARAMS');
	console.log(this.params);

       this.route.params.subscribe(params => {
       const emailCode = params['emailCode']; // (+) converts string 'id' to a number
       const emailId = params['id'];
       // In a real app: dispatch action to load the details here.
   	console.log('Params in observable');
	console.log(params);
	console.log('emailcode');
	console.log(emailCode);
	console.log('emailId');
	console.log(emailId);


	 let headers = new Headers({ 'Content-Type': 'application/json'});
         let options = new RequestOptions({ headers: headers });
	  this.http.post('/api/v1/email/'+emailId , {emailCode: emailCode}, options).subscribe((resp) =>{

			
			console.log('Email from server');
			console.log(resp);
		this.email = resp.json().email;
		console.log(this.email);

		
	        var iframe = document.getElementById('viewEmail');
		var iframedoc = (<HTMLIFrameElement> iframe).contentDocument || (<HTMLIFrameElement> iframe).contentWindow.document;


		iframedoc.body.innerHTML = this.email;

			console.log('EMAIL');
			console.log(this.email);
		
		setTimeout(function(){
			
			(<HTMLInputElement> iframe).height = (iframedoc.body.scrollHeight+50).toString();
		},200);




		},(err)=>{
			console.log("in the http post of get User get Email from server.. ERR");
			console.log(err);

			
			
				
	 });


 });


	
  }

}
