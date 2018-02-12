import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './login.reducer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  LoginComponent,
  LoginService } from './index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('login', loginReducer),
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
