import { 
  Component,
  ChangeDetectionStrategy } from '@angular/core';
import { Course } from './course.model';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent {
  @Input() course: Course;
  @Input() courseStatus: string;
  @Output() deleteCourse = new EventEmitter<Course>();

  onAskToDelete(course: Course): void {
    this.deleteCourse.emit(course);
  }

}
