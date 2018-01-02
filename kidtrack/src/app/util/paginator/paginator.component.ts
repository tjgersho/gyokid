import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {


  @Input() page: number;
  @Input() numPages: number;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }



 pagBackClass(){
	if (this.page == 0){
		return {disabled: true};
         }else{
		return {};
	}

 }
   pagFwdClass(){
	if (this.page >= this.numPages - 1){
		return {disabled: true};
         }else{
		return {};
	}

   }

  pageActivePageClass(pg: number){
	if (pg === (this.page + 1)){
		return {active: true};

	}else{
		return {};
	}

  }



 pagBackButtonClick(){
	 //console.log('Pag BACK button click');
	//console.log(this.page);
	//console.log(this.numPages);

	if (this.page > 0){
	     //console.log('Event Emit');
		this.onPageChange.emit((this.page - 1));
         }

 }

  pagFwdButtonClick(){

	//console.log('Pag forward button click');
	//console.log(this.page);
	//console.log(this.numPages);

	if (this.page < this.numPages - 1){
	     //console.log('Event Emit');
		this.onPageChange.emit((this.page + 1));
	}


   }


 pagButtonClick(pg: number){
		//console.log('Pag click');
		//console.log(pg);

		//console.log(this.page + 1);
	if (pg !== this.page + 1){
	     //console.log('Event Emit');

		this.onPageChange.emit((pg - 1));
         }

 }


}
