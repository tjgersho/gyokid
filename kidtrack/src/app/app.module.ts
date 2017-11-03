import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';


////Route Components ////
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TrackerComponent } from './tracker/tracker.component';
import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ReturnsComponent } from './returns/returns.component';
import { ContactComponent } from './contact/contact.component';




//////Element Components//////
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DeviceComponent } from './device/device.component';
import { DeviceSelectorComponent } from './tracker/device-selector/device-selector.component';



import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { RegisterDeviceComponent } from './register-device/register-device.component';
import { BuyDeviceComponent } from './buy-device/buy-device.component';


////SERVICES///////
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { GlobalService } from './services/global.service';


import { MapComponent } from './tracker/map/map.component';
import { AdminComponent } from './admin/admin.component';


import { LoaderComponent } from './loader/loader.component';

import { UsersComponent } from './admin/users/users.component';
import { DevicesComponent } from './admin/devices/devices.component';
import { HomeComponent } from './admin/home/home.component';
import { EmailComponent } from './admin/email/email.component';

import { TruncatePipe } from './truncate.pipe';
import { BrowseremailComponent } from './browseremail/browseremail.component';
import { EmailconfirmComponent } from './emailconfirm/emailconfirm.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';
import { ViewEmailComponent } from './view-email/view-email.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';



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
    BuyCreditsComponent,
    RegisterDeviceComponent,
    BuyDeviceComponent,
    AdminComponent,
    LoaderComponent,
    UsersComponent,
    DevicesComponent,
    HomeComponent,
    EmailComponent,
    TruncatePipe,
    BrowseremailComponent,
    EmailconfirmComponent,
    PrivacyComponent,
    TermsComponent,
    ReturnsComponent,
    ContactComponent,
    ResetEmailComponent,
    ViewEmailComponent,
    ConfirmEmailComponent
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
