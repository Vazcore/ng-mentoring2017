import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './course.service';
import { Course, FRESH_COLOR, UPCOMING_COLOR, OUTDATED_COLOR } from './course/course.model';
import { FilterByPipe } from '../../common/filter/filter-by.pipe';
import { ModalService } from '../../common/modal/modal.service';
import { DatesService } from '../../common/dates/dates.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PageStatus } from './course-page-status';
import { ModifyAction } from './course/modify-action.interface';
import { Paging } from './paging/paging.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeLast';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [
    FilterByPipe
  ]
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Array<Course> = [];
  initialCourses: Array<Course>;
  courseModalId: string = 'course_modal';
  preDeletedCourse: Course;
  editedCourse: Course;
  getCoursesSub: Subscription;
  findCoursesSub: Subscription;
  getCourses$: Subject<String> = new Subject();
  paging$: Subject<Paging> = new Subject();
  numberOfCoursesOnPage: number = 3;
  noMoreCourses: boolean = false;
  paging: Paging = new Paging(0, this.numberOfCoursesOnPage);  
  searching$: Subject<string> = new Subject();
  displayingMode$: Subject<'FIND'|'ALL'> = new Subject();
  pageStatus: PageStatus = PageStatus.VIEW_COURSES;


  constructor(
    private courseSrv: CourseService,
    private filterByPipe: FilterByPipe,
    private modalService: ModalService,
    private datesService: DatesService
  ) {}

  ngOnInit() {
    this.initCourses();
    this.initSearching();
    this.getCourses$.next(null);
  }

  getPageStatus(status: string): number {
    return PageStatus[status];
  }

  changePageStatus(status: string): void {
    this.pageStatus = PageStatus[status];
  }

  setPageStatus(status: number): void {
    this.pageStatus = status;
  }

  initCourses() {
    this.getCoursesSub = this.paging$.startWith(
      this.paging
    )
    .combineLatest(this.displayingMode$.startWith('ALL'))
    .filter((inputs: [Paging, string]): boolean => {
      return inputs[1] === 'ALL';
    })
    .switchMap((inputs: [Paging, string]) => {
      return this.courseSrv.getCourses(inputs[0]);
    })
    .switchMap((courses: Course[]) => {
      return this.prepareCourses(courses);
    })
    .subscribe(this.onLoadingCourses.bind(this));
  }

  initSearching() {
    this.findCoursesSub = this.searching$
    .combineLatest(this.paging$, this.displayingMode$)
    .filter((inputs:[string,Paging,string]): boolean => {
      return inputs[2] === 'FIND';
    })
    .switchMap((inputs:[string,Paging,string]) => {
      return this.courseSrv.getCourses(inputs[1], inputs[0]);
    })
    .switchMap((courses: Course[]) => {
      return this.prepareCourses(courses);
    })
    .subscribe(this.onLoadingCourses.bind(this));
  }

  prepareCourses(courses: Course[]): Observable<Course[]> {
    return Observable.of(courses)
    .map((courses: Course[]) => {
      return courses.map((course: Course) => {
        return new Course(course.id, course.title, course.description, new Date(course.date), course.duration, course.authors, course.topRated);
      })
      .filter((course: Course) => {
        return this.getCourseStatus(course) !== OUTDATED_COLOR;  
      });
    });
  }

  onLoadingCourses(courses: Course[]): void {
    if (courses.length === 0) {
      this.noMoreCourses = true;
    } else {
      this.courses = [...this.courses, ...courses];
      this.initialCourses = this.getInitialCourses();
    }
  }

  ngOnDestroy() {
    this.getCoursesSub.unsubscribe();
    this.findCoursesSub.unsubscribe();
  }

  nextPage():void {
    this.paging$.next(
      this.updatePaging(this.paging.start + this.numberOfCoursesOnPage, this.paging.count)
    );
  }

  updatePaging(start: number, count: number): Paging {
    this.paging = new Paging(start, count);
    return this.paging;
  }

  getInitialCourses(): Array<Course> {
    return this.courseSrv.copyCourses(this.courses);
  }

  onDelete(course: Course) {
    this.courseSrv.removeCourse(course.id)
    .subscribe(deleted => {
      this.closeDeleteModal();
      this.getCourses$.next(null);
      this.find("");
    });
  }

  closeDeleteModal() {
    this.modalService.close(this.courseModalId);
  }
  
  onCancelDelete(courseId: number) {
    this.closeDeleteModal();
  }

  onModifyAction(action: ModifyAction): void {
    if (action.type === 'delete') {
      this.onAskToDelete(action.course);
    } else if (action.type === 'edit') {
      this.editedCourse = action.course;
      this.setPageStatus(PageStatus.EDIT_COURSE);
    }
  }

  onAskToDelete(course: Course) {
    this.modalService.open(this.courseModalId);
    this.preDeletedCourse = course;
  }

  find(keyword: string) {
    this.courses = [];
    this.noMoreCourses = false;
    this.displayingMode$.next('FIND');
    this.paging$.next(this.updatePaging(0, this.numberOfCoursesOnPage));
    this.searching$.next(keyword);
  }

  getCourseStatus(course: Course): string {
    let currentDate = this.datesService.getCurrentDate().getTime();
    let courseDate = course.date.getTime();
    let twoWeeksShift = 14 * 24 * 60 * 60 * 1000;
    let courseStatus = '';

    if (courseDate > currentDate) {
      courseStatus = UPCOMING_COLOR;
    }
    else if (
      courseDate < currentDate 
      && courseDate >= (currentDate - twoWeeksShift)
    ) {
      courseStatus = FRESH_COLOR;
    } else {
      return courseStatus = OUTDATED_COLOR;
    }
    return courseStatus;
  }

}
