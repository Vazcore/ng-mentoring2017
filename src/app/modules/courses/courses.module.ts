import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CoursesComponent, CourseComponent],
  exports: [CoursesComponent]
})
export class CoursesModule { }
