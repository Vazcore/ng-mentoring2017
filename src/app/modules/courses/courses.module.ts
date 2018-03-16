import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseFormComponent
  ],
  exports: [CoursesComponent, CourseFormComponent],
  providers: [
    CourseService
  ]
})
export class CoursesModule { }
