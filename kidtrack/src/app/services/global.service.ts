import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';


declare var jquery:any;
declare var $ :any;



export class GlobalService{

	cellCreditFactor: number = 1000;

	screenWidth: number;
	screenHeight: number;
	jqWindow = $(window);
     
	
	onWindowChange: Observable<object>;
	private _observer: Observer<object>;

	constructor(){

		console.log('Globals constructor...');
	

		
		this.screenWidth = this.jqWindow.width();
		this.screenHeight = this.jqWindow.height();

                this.onWindowChange = Observable.create((observer: Observer<object>) => {
			console.log('Observer on creating observable');
	
			console.log(observer);

			this._observer = observer;
		});

         }


	updateWindowDimensions(){
		console.log('Globals window Size Changed');
   		this.screenWidth = this.jqWindow.width();
		this.screenHeight = this.jqWindow.height();

		this._observer.next({width: this.screenWidth, height: this.screenHeight});
	}

	


}