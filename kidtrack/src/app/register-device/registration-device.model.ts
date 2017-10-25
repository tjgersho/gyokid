import { Device } from '../tracker/device/device.model';

export class RegistrationDevice extends Device {
	registrationOk: number = 0;
	regstatustooltip: string = "Checking the registration... Please wait."
}