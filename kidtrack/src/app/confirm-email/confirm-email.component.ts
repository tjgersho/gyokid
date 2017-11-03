import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

     params: object;

   constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
	console.log('IN confirm email');
	console.log(this.route);

	this.params = this.route.snapshot.params;

	console.log('URL PARAMS in confirm email');
	console.log(this.params);
	
  }
}
