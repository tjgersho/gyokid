import { Device } from '../tracker/device/device.model';

export class User {
	username: string;
	email: string;
	token: string;
	deviceList: Device[];
}