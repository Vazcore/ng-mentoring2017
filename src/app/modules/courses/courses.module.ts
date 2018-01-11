import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CoursesComponent,
  CourseComponent,
  CourseService
} from './index';
import { SharedModule } from '../../common/shared.module';
import { CourseFormComponent } from './course-form/course-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseFormComponent
  ],
  exports: [CoursesComponent],
  providers: [
    CourseService
  ]
})
export class CoursesModule { }
