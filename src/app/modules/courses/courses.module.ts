import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CoursesComponent,
  CourseComponent,
  CourseService
} from './index';
import { SharedModule } from '../../common/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CoursesComponent,
    CourseComponent
  ],
  exports: [CoursesComponent],
  providers: [
    CourseService
  ]
})
export class CoursesModule { }
