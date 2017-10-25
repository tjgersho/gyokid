import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var paypal: any;


@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.css']
})
export class BuyCreditsComponent implements OnInit {
buyAmount: number = 2;
optionSelect: number = 1;
  constructor(private router: Router) { }

  ngOnInit() {
var self = this;
   paypal.Button.render({

        env: 'sandbox', //'production', // Or 'sandbox'

        client: {
            sandbox:    'AQLrw2lq78u6UcOqyQbGpEPyScKBxe-vEdcZoHBlGR2h1g8mAJG-bd9biVhkgEwiulxVb2NLVdd17G4S',
            production: 'AYbzzFmXcxphMaz0z2CRSUDSzgARj_l7Ew_XIfkg2wZUSQ_dgU1a4DxyXkkIePZh61-VtROO8SyihoSB'
        },
        locale: 'en_US',

        style: {
            color: 'blue',
            shape: 'rect',
  	    size: 'responsive' 
        },


        commit: true, // Show a 'Pay Now' button

        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: self.buyAmount.toFixed(2), currency: 'USD' }
                        }
                    ]
                }
            });
        },

        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function(payment) {
		console.log('paymentComplete');

		console.log(payment);
                // The payment is complete!
                // You can now show a confirmation message to the customer

		self.router.navigate(['/dashboard']);
            });
        },onError: function(err) {
            // Show an error page here, when an error occurs
            console.log("RESPONS FROM PAYPAL PAYEMNT SUCCESS ERR");
	     console.log(err);

        },
	 onCancel: function(data, actions) {
            // Show a cancel page or return to cart
		console.log('Cancel ');
		console.log(data);
		console.log(actions);
        }

    }, '#paypal-button');  




  }




  changeOption(opt:number){
	this.optionSelect = opt;

	switch(opt){
		case 1:
		 this.buyAmount = 2;
		break;
		case 2:
		 this.buyAmount = 5;
		break
		case 3:
		 this.buyAmount = 10;
		break
		case 4:
		 this.buyAmount = 50;
		break;

	}
  }





}
