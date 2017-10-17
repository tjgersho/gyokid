import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';




import { AppComponent } from './app.component';



import { HeaderComponent } from './header/header.component';
import { TrackerComponent } from './tracker/tracker.component';
import { FooterComponent } from './footer/footer.component';
import { DeviceComponent } from './tracker/device-selector/device/device.component';
import { DeviceSelectorComponent } from './tracker/device-selector/device-selector.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


import { UserService } from './services/user.service';

import { AuthGuardService } from './services/auth-guard.service';

// Define the routes
const ROUTES = [
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

   }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrackerComponent,
    FooterComponent,
    IndexComponent,
    DeviceComponent,
    DeviceSelectorComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [UserService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
