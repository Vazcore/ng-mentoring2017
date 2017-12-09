import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  CoursesComponent,
  CourseComponent,
  CourseService
} from './index';
import { SharedModule } from '../../common/shared.module';
import { ModalComponent } from '../../common/modal/modal.component';
import { ModalService } from '../../common/modal/modal.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CoursesComponent,
    CourseComponent,
    ModalComponent
  ],
  exports: [CoursesComponent],
  providers: [
    CourseService,
    ModalService
  ]
})
export class CoursesModule { }
