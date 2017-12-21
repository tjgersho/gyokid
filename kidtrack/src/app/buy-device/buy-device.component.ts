import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var xProductBrowser: any;



@Component({
  selector: 'app-buy-device',
  templateUrl: './buy-device.component.html',
  styleUrls: ['./buy-device.component.css']
})
export class BuyDeviceComponent implements OnInit, AfterViewInit {

  constructor() {


  }

  ngOnInit() {




  }


 ngAfterViewInit(){

          xProductBrowser("categoriesPerRow=3","views=grid(1,1) list(1) table(1)","categoryView=grid","searchView=list","id=my-store-12807189");

 }

}
