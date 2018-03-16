import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../course/course.model';
import { PageStatus } from '../course-page-status';
import { DateValidator } from '../../../common/validators/date.validator';
import { ArrayValidator } from '../../../common/validators/array.validator';
import { AuthorsService } from '../../authors/authors.service';
import { Subscription } from 'rxjs/Subscription';
import { Author } from '../../authors/author.model';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.less']
})
export class CourseFormComponent implements OnInit, OnDestroy {
	@Input() course: Course;
	@Input() mode: string;
  courseForm: FormGroup;
  authorsSub: Subscription;
  modifySub: Subscription;
  authors: Array<Author> = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authorsSrv: AuthorsService,
    private courseSrv: CourseService
  ) { }

  ngOnInit() {
    this.setAuthors();
    this.createForm();
  }

  ngOnDestroy() {
    this.authorsSub.unsubscribe();
    if (this.modifySub){
      this.modifySub.unsubscribe();
    }
  }

  createForm(): void {
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

  setAuthors(): void {
    this.authorsSub =  this.authorsSrv.getAuthors()
    .subscribe(authors => {
      this.authors = authors;
    });
  }

  proccessForm(): void {
    let course:Course = this.courseForm.value;
    course.date = new Date(course.date);
    
    if (this.mode === 'Edit') {
      this.onProccessorm(this.courseSrv.updateCourse(this.course.id, course));
    } else {
      this.onProccessorm(this.courseSrv.addCourse(course));
    }
  }

  onProccessorm(observable: Observable<Course>): void {
    this.modifySub = observable
    .subscribe(data => {
      this.router.navigate(['courses']);
    });
  }

  cancel(): void {
    this.router.navigate(['courses']);
  }

}
