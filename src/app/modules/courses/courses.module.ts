import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseService } from './course.service';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../common/search-bar/search-bar.component';
import { ModalComponent } from '../../common/modal/modal.component';
import { ModalService } from '../../common/modal/modal.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    SearchBarComponent,
    ModalComponent
  ],
  exports: [CoursesComponent],
  providers: [
    CourseService,
    ModalService
  ]
})
export class CoursesModule { }
