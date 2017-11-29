import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { RecaptchaModule } from 'ng-recaptcha';

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
import { DeviceSelectorComponent } from './tracker/device-selector/device-selector.component';



import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { RegisterDeviceComponent } from './register-device/register-device.component';
import { BuyDeviceComponent } from './buy-device/buy-device.component';


////SERVICES///////
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthPingGuardService } from './services/auth-ping-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { GlobalService } from './services/global.service';
import { DeviceService } from './services/device.service';



import { MapComponent } from './tracker/map/map.component';
import { AdminComponent } from './admin/admin.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { PingsalesComponent } from './admin/pingsales/pingsales.component';
import { UsersComponent } from './admin/users/users.component';
import { DevicesComponent } from './admin/devices/devices.component';
import { HomeComponent } from './admin/home/home.component';
import { EmailComponent } from './admin/email/email.component';





import { LoaderComponent } from './loader/loader.component';



import { TruncatePipe } from './truncate.pipe';

import { ResetEmailComponent } from './reset-email/reset-email.component';
import { ViewEmailComponent } from './view-email/view-email.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';



//Directives ////
import { ViewEmailDirective } from './admin/email/view-email.directive';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReferralWidgetComponent } from './referral-widget/referral-widget.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrackerComponent,
    FooterComponent,
    IndexComponent,
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
    PrivacyComponent,
    TermsComponent,
    ReturnsComponent,
    ContactComponent,
    ResetEmailComponent,
    ViewEmailComponent,
    ConfirmEmailComponent,
    ViewEmailDirective,
    CommentsComponent,
    PingsalesComponent,
    ChangePasswordComponent,
    ReferralWidgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    RecaptchaModule.forRoot() // Keep in mind the "forRoot"-magic nuances!
  ],
  providers: [UserService, AuthGuardService, AuthPingGuardService, AdminGuardService, GlobalService, DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
