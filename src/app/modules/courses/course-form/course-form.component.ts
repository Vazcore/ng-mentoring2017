import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../course/course.model';
import { PageStatus } from '../course-page-status';
import { DateValidator } from '../../../common/validators/date.validator';
import { ArrayValidator } from '../../../common/validators/array.validator';
import { AuthorsService } from '../../authors/authors.service';
import { Subscription } from 'rxjs/Subscription';
import { Author } from '../../authors/author.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.less']
})
export class CourseFormComponent implements OnInit, OnDestroy {
	@Input() course: Course;
	@Input() mode: string;
  @Output() changeParentStatus = new EventEmitter<number>();
	status: string[] = [
		'', 'Add', 'Edit'
  ];
  courseForm: FormGroup;
  authorsSub: Subscription;
  authors: Array<Author> = [];

  constructor(
    private formBuilder: FormBuilder,
    private authorsSrv: AuthorsService
  ) { }

  ngOnInit() {
    this.setAuthors();
    if (this.status[this.mode] === 'Add') {
      this.course = null;
    }

    this.courseForm = this.formBuilder.group(
      {
        title: [this.course ? this.course.title : '', [Validators.required, Validators.maxLength(50)]],
        description: [this.course ? this.course.description : '', [Validators.required, Validators.maxLength(500)]],
        date: [this.course ? this.course.date : '', [Validators.required, DateValidator.isDateValid]],
        duration: [this.course ? this.course.duration : undefined, [Validators.required, Validators.pattern(/\d+/)]],
        authors: [this.course ? this.course.authors : [], ArrayValidator.isArrayNotEmpty]
      }
    );
  }

  ngOnDestroy() {
    this.authorsSub.unsubscribe();
  }

  setAuthors(): void {
    this.authorsSub =  this.authorsSrv.getAuthors()
    .subscribe(authors => {
      this.authors = authors;
    });
  }

  proccessForm(): void {
    this.changeParentStatus.emit(PageStatus.VIEW_COURSES);
  }

  cancel(): void {
    this.changeParentStatus.emit(PageStatus.VIEW_COURSES);
  }

}
