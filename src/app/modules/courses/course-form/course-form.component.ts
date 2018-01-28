import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../course/course.model';
import { PageStatus } from '../course-page-status';
import { DateValidator } from '../../../common/validators/date.validator';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.less']
})
export class CourseFormComponent implements OnInit {
	@Input() course: Course;
	@Input() mode: string;
  @Output() changeParentStatus = new EventEmitter<number>();
	status: string[] = [
		'', 'Add', 'Edit'
  ];
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if (this.status[this.mode] === 'Add') {
      this.course = null;
    }

    this.courseForm = this.formBuilder.group(
      {
        title: [this.course ? this.course.title : '', [Validators.required, Validators.maxLength(50)]],
        description: [this.course ? this.course.description : '', [Validators.required, Validators.maxLength(500)]],
        date: [this.course ? this.course.date : undefined, [Validators.required, DateValidator.isDateValid]],
        duration: [this.course ? this.course.duration : undefined, [Validators.required, Validators.pattern(/\d+/)]]
      }
    );
  }

  proccessForm(): void {
    this.changeParentStatus.emit(PageStatus.VIEW_COURSES);
  }

  cancel(): void {
    this.changeParentStatus.emit(PageStatus.VIEW_COURSES);
  }

}
