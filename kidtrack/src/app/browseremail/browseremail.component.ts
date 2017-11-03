import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browseremail',
  templateUrl: './browseremail.component.html',
  styleUrls: ['./browseremail.component.css']
})
export class BrowseremailComponent implements OnInit {

  params: string;

  constructor(private route: ActivatedRoute, private router: Router) { 
	console.log('In view Email');

	console.log(route);

   }

  ngOnInit() {
	console.log('IN browser email init');
	console.log(this.route);
	
  }

}
