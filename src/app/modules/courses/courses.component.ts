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

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/from';

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
  getCoursesSub: Subscription;
  getCourses$: Subject<String> = new Subject();
  pageStatus: PageStatus = PageStatus.VIEW_COURSES;

  constructor(
    private courseSrv: CourseService,
    private filterByPipe: FilterByPipe,
    private modalService: ModalService,
    private datesService: DatesService
  ) {}

  ngOnInit() {
    this.initCourses();
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

  getCourses(): Observable<Course[]> {
    return this.getCourses$
    .switchMap(() => {
      return this.courseSrv.getCourses();
    });
  }

  initCourses() {
    this.getCoursesSub = this.getCourses()
    .map((courses: Course[]) => {
      return courses.filter((course: Course) => {
        return this.getCourseStatus(course) !== OUTDATED_COLOR;
      });
    })
    .subscribe((courses: Course[]) => {
      this.courses = courses;
      this.initialCourses = this.getInitialCourses();
    });
  }

  ngOnDestroy() {
    this.getCoursesSub.unsubscribe();
  }

  getInitialCourses(): Array<Course> {
    return this.courseSrv.copyCourses(this.courses);
  }

  onDelete(course: Course) {
    this.courseSrv.removeCourse(course.id);
    this.closeDeleteModal();
    this.getCourses$.next(null);
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
      this.setPageStatus(PageStatus.EDIT_COURSE);
    }
  }

  onAskToDelete(course: Course) {
    this.modalService.open(this.courseModalId);
    this.preDeletedCourse = course;
  }

  find(keyword: string) {
    this.courses = this.filterByPipe.transform<Course>(
                  this.initialCourses,
                  'title',
                  keyword);
    console.log(keyword);
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
