import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuardService } from './services/auth-guard.service';
import { AuthPingGuardService } from './services/auth-ping-guard.service';
import { AdminGuardService } from './services/admin-guard.service';


import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TrackerComponent } from './tracker/tracker.component';


import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { RegisterDeviceComponent } from './register-device/register-device.component';
import { BuyDeviceComponent } from './buy-device/buy-device.component';


import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { DevicesComponent } from './admin/devices/devices.component';
import { EmailComponent } from './admin/email/email.component';
import { HomeComponent } from './admin/home/home.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { PingsalesComponent } from './admin/pingsales/pingsales.component';

import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ReturnsComponent } from './returns/returns.component';
import { ContactComponent } from './contact/contact.component';


import { ResetEmailComponent } from './reset-email/reset-email.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ViewEmailComponent } from './view-email/view-email.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent
  },
  {
     path: 'tracker',
     component: TrackerComponent,
     canActivate: [AuthPingGuardService]
   },
   {
	path: 'register',
	component: RegisterComponent

   },
   {
	path: 'referral/code/:code',
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
	path: 'changepw/:name/code/:code',
	component: ChangePasswordComponent
   },
   {
	path: 'resetemail',
	component: ResetEmailComponent
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
	path: 'returns',
	component: ReturnsComponent
   },
   {
	path: 'terms',
	component: TermsComponent
   },
   {
	path: 'privacy',
	component: PrivacyComponent
   },
   {
	path: 'contact',
	component: ContactComponent
   },
   {
	path: 'viewemail/:emailCode/id/:id',
	component: ViewEmailComponent
   },
   {
	path: 'emailconfirm/:username/code/:code',
	component: ConfirmEmailComponent
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
    
          },
          {
            path: 'comments',
            component: CommentsComponent
    
          },
          {
            path: 'sales',
            component: PingsalesComponent
    
          }
        ]

   },
    { path: '**',
	redirectTo: '/'
     }
];



@NgModule({
 imports: [RouterModule.forRoot(appRoutes)],
 exports: [RouterModule]


})


export class AppRoutingModule {}