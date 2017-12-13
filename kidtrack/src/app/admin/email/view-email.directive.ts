import { Directive, ElementRef, OnInit, Input} from '@angular/core';

declare var jquery:any;
declare var $ :any;

@Directive({
   selector: '[appViewEmail]'
})



export class ViewEmailDirective {

	@Input('appViewEmail') emailData: string = "<h1>EMAIL HTML</h1>";

	
	constructor(private elementRef: ElementRef){

		console.log('Element');
		
        }
	
	ngOnInit(){
		console.log('Element');
		console.log(this.elementRef);
		

	      var doc = this.elementRef.nativeElement.contentWindow.document;
               var $body = $('body',doc);

		this.emailData = this.emailData.replace(/cid:/g, "assets/");

               $body.html(this.emailData);


	}
}