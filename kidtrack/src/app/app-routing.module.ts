import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';


import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TrackerComponent } from './tracker/tracker.component';


import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { RegisterDeviceComponent } from './register-device/register-device.component';
import { BuyDeviceComponent } from './buy-device/buy-device.component';


import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { DevicesComponent } from './admin/devices/devices.component';
import { EmailComponent } from './admin/email/email.component';
import { HomeComponent } from './admin/home/home.component';


const appRoutes: Routes = [
{
    path: '',
    pathMatch: 'full',
    component: IndexComponent
  },
  {
     path: 'tracker',
     component: TrackerComponent,
     canActivate: [AuthGuardService]
   },
   {
	path: 'register',
	component: RegisterComponent

   },
   {
	path: 'login',
	component: LoginComponent

   },
   {

	path: 'getpw',
	component: ForgetpwComponent
   },
   {
	path: 'dashboard',
	component: DashboardComponent,
        canActivate: [AuthGuardService]
   },
   {
	path: 'register-device',
	component: RegisterDeviceComponent,
        canActivate: [AuthGuardService]
   },
   {
	path: 'buy-device',
	component: BuyDeviceComponent
   },
   {
	path: 'buy-credits',
	component: BuyCreditsComponent,
        canActivate: [AuthGuardService]
   },

   {
	path: 'admin',
	component: AdminComponent,
	canActivate: [AdminGuardService],
	 children: [
            {
            path: 'home',
            component: HomeComponent
          },

          {
            path: 'users',
            component: UsersComponent
          },
          {
            path: 'devices',
            component: DevicesComponent
		
          },
          {
            path: 'email',
            component: EmailComponent
    
          }
        ]

   }
];



@NgModule({
 imports: [RouterModule.forRoot(appRoutes)],
 exports: [RouterModule]


})


export class AppRoutingModule {}