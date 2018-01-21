import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course, FRESH_COLOR, UPCOMING_COLOR } from './course/course.model';
import { FilterByPipe } from '../../common/filter/filter-by.pipe';
import { ModalService } from '../../common/modal/modal.service';
import { DatesService } from '../../common/dates/dates.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [
    FilterByPipe
  ]
})
export class CoursesComponent implements OnInit {
  courses: Array<Course>;
  initialCourses: Array<Course>;
  courseModalId: string = 'course_modal';
  preDeletedCourse: Course; 

  constructor(
    private courseSrv: CourseService,
    private filterByPipe: FilterByPipe,
    private modalService: ModalService,
    private datesService: DatesService
  ) {}

  ngOnInit() {
    this.courses = this.courseSrv.getCourses();
    this.initialCourses = this.getInitialCourses();
  }

  getInitialCourses(): Array<Course> {
    return this.courseSrv.copyCourses(this.courses);
  }

  onDelete(course: Course) {
    this.courseSrv.removeCourse(course.id);
    this.closeDeleteModal();
    this.courses = this.courseSrv.getCourses();
    this.initialCourses = this.getInitialCourses();
    console.log(course);
  }

  closeDeleteModal() {
    this.modalService.close(this.courseModalId);
  }
  
  onCancelDelete(courseId: number) {
    this.closeDeleteModal();
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
    }
    return courseStatus;
  }

}
