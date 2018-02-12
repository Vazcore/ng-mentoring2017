import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './courses.reducer';
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
    StoreModule.forFeature('courses', courseReducer),
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
