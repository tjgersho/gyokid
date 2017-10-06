import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';



import { HeaderComponent } from './header/header.component';
import { TrackerComponent } from './tracker/tracker.component';
import { FooterComponent } from './footer/footer.component';
import { DevicesComponent } from './tracker/devices/devices.component';
import { DeviceComponent } from './tracker/devices/device/device.component';
import { DeviceSelectorComponent } from './tracker/device-selector/device-selector.component';
import { CountryComponent } from './tracker/device-selector/country/country.component';
import { StateComponent } from './tracker/device-selector/country/state/state.component';
import { DistrictComponent } from './tracker/device-selector/country/state/district/district.component';
import { SchoolComponent } from './tracker/device-selector/country/state/district/school/school.component';
import { IndexComponent } from './index/index.component';




// Define the routes
const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component: IndexComponent
  },
  {
     path: 'tracker',
     component: TrackerComponent
   }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrackerComponent,
    FooterComponent,
    IndexComponent,
    DevicesComponent,
    DeviceComponent,
    DeviceSelectorComponent,
    CountryComponent,
    StateComponent,
    DistrictComponent,
    SchoolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
