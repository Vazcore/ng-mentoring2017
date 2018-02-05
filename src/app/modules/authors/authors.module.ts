import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsService } from './authors.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthorsService
  ]
})
export class AuthorsModule { }
