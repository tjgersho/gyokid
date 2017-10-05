import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { PostsComponent } from './posts/posts.component';


import {TrackerComponent } from './tracker/tracker.component';

import { PostsService } from './posts.service';


// Define the routes
const ROUTES = [
  {
    path: '',
   // redirectTo: 'posts',
    pathMatch: 'full',
    component: ServersComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
     path: 'tracker',
     component: TrackerComponent
   }
];

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    PostsComponent,
    ServersComponent,
    ServerComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
