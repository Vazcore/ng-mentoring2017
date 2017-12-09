import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LoginComponent,
  LoginPageComponent,
  LoginService } from './index';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    LoginPageComponent
  ],
  exports: [
    LoginComponent,
    LoginPageComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
