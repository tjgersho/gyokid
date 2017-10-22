import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';



import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TrackerComponent } from './tracker/tracker.component';
import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DeviceComponent } from './tracker/device/device.component';
import { DeviceSelectorComponent } from './tracker/device-selector/device-selector.component';


import { UserService } from './services/user.service';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';


import { GlobalService } from './services/global.service';
import { MapComponent } from './tracker/map/map.component';
import { AdminComponent } from './admin/admin.component';
import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { RegisterDeviceComponent } from './register-device/register-device.component';
import { BuyDeviceComponent } from './buy-device/buy-device.component';


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
    LoginComponent,
    ForgetpwComponent,
    DashboardComponent,
    MapComponent,
    AdminComponent,
    BuyCreditsComponent,
    RegisterDeviceComponent,
    BuyDeviceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthGuardService, AdminGuardService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }