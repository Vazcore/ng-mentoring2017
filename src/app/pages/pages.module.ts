import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CoursesModule,
  LoginModule,
  NavModule
} from '../index';
import {
  CourseFormPageComponent,
  CoursesPageComponent,
  LoginPageComponent,
  NotFoundPageComponent
} from './index';

const APP_MODULES = [
  CoursesModule,
  LoginModule,
  NavModule
];

const PAGES_COMPONENTS = [
  CourseFormPageComponent,
  CoursesPageComponent,
  LoginPageComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ...APP_MODULES
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ],
  exports: [
    ...PAGES_COMPONENTS
  ]
})
export class PagesModule { }
