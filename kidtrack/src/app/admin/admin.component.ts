import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AdminService } from './admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})
export class AdminComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
  }

}
