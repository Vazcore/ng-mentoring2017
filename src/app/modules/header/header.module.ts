import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

import { LoginModule } from '../login/login.module';
import { NavModule } from '../nav/nav.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    NavModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
