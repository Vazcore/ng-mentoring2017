import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { NavService } from './nav.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavComponent],
  exports: [NavComponent],
  providers: [
    NavService
  ]
})
export class NavModule { }
