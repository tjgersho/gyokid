import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TrackerComponent } from './tracker/tracker.component';
import { AuthGuardService } from './services/auth-guard.service';

import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
	component: DashboardComponent
   }
];



@NgModule({
 imports: [RouterModule.forRoot(appRoutes)],
 exports: [RouterModule]


})


export class AppRoutingModule {}