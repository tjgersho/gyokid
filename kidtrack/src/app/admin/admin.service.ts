import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


import { Device } from './device.model';
import { User } from './user.model';

@Injectable()
export class AdminService {

 private deviceUrl:string =  "";
 private userUrl:string = "";



constructor(private http: Http) { }
 
getDevices(count:number = 10, page:number = 0, order: string = 'id DESC'): Promise<Device[]> {

  this.deviceUrl = 'api/v1/admin/device?count=' + count + '&page=' + page + '&order=' + order;
  
  return this.http.get(this.deviceUrl)
             .toPromise()
             .then(response => response.json().data as Device[])
             .catch(this.handleError);
}
 
getUsers(count:number = 10, page:number = 0, order: string = 'id DESC'): Promise<User[]> {

  this.userUrl = 'api/v1/admin/user?count=' + count + '&page=' + page + '&order=' + order;
  
  return this.http.get(this.userUrl)
             .toPromise()
             .then(response => response.json().data as User[])
             .catch(this.handleError);
}








private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}






}
