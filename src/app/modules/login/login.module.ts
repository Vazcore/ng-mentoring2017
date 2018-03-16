import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LoginComponent,
  LoginService } from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
