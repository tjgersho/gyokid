export class User{
		id: number;
		username: string;
		email: string;
		emailConfirmCode:string;
		emailConfirmed: boolean;
		sendmail:boolean;
		role:number;
		referralCode:string;
		shippingAddress:string;
        cellularCredits: number;
		referralWins:number;

	constructor(){
	}
}
