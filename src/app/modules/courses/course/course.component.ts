import { 
  Component,
  ChangeDetectionStrategy } from '@angular/core';
import { Course } from './course.model';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ModifyAction } from './modify-action.interface';

@Component({
  selector: 'app-course',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent {
  @Input() course: Course;
  @Input() courseStatus: string;
  @Output() onModifyCourse = new EventEmitter<ModifyAction>();

  onAskToDelete(course: Course): void {
    const action = {
      type: 'delete',
      course: course
    };
    this.onModifyCourse.emit(action);
  }

  onEdit(course: Course): void {
    const action = {
      type: 'edit',
      course: course
    };
    this.onModifyCourse.emit(action);
  }

}
