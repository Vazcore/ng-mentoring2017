import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course/course.model';
import { PageStatus } from '../course-page-status';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.less']
})
export class CourseFormComponent implements OnInit {
	@Input() course?: Course;
	@Input() mode: string;
  @Output() changeParentStatus = new EventEmitter<number>();
	status: string[] = [
		'', 'Add', 'Edit'
	];

  constructor() { }

  ngOnInit() {
  }

  proccessForm(): void {
    this.changeParentStatus.emit(PageStatus.VIEW_COURSES);
  }

  cancel(): void {
    this.changeParentStatus.emit(PageStatus.VIEW_COURSES);
  }

}
