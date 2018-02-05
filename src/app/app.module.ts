import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';


import {
  CoursesModule,
  HeaderModule,
  FooterModule,
  LoginModule,
  ProfileModule,
  AuthorsModule,
  SharedModule
} from './index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    HeaderModule,
    FooterModule,
    LoginModule,
    ProfileModule,
    AuthorsModule,
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
