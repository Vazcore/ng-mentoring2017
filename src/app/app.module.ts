import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { ROUTES } from './app.routes';

import {
  HeaderModule,
  FooterModule,
  ProfileModule,
  AuthorsModule,
  SharedModule
} from './index';

import { CanActivateAppService } from './app-guards/can-activate-app.service';
import { CanActivateLoginService } from './pages/login-page/can-activate-login.service';
const APP_ROUTER_GUARDS = [
  CanActivateAppService,
  CanActivateLoginService
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,    
    RouterModule.forRoot(ROUTES, {useHash: true}),
    PagesModule,
    HeaderModule,
    FooterModule,
    ProfileModule,
    AuthorsModule,
    SharedModule.forRoot()
  ],
  providers: [
    ...APP_ROUTER_GUARDS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
