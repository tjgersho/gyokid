import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-email',
  templateUrl: './view-email.component.html',
  styleUrls: ['./view-email.component.css']
})
export class ViewEmailComponent implements OnInit {

 params: any;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
	console.log('IN browser email init');
	console.log(this.route);

	this.params = this.route.snapshot.params;

	console.log('URL PARAMS');
	console.log(this.params);
	
  }

}
