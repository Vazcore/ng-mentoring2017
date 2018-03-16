import { Component, OnInit } from '@angular/core';
import { Course } from '../../modules/courses/course/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../modules/courses/course.service';
import {NavService, BreadCrumInterface, BreadCrumParamsInterface} from '../../modules/nav/nav.service';
import {NavPage} from '../../modules/nav/nav-page.interface';

@Component({
  selector: 'app-course-form-page',
  templateUrl: './course-form-page.component.html',
  styleUrls: ['./course-form-page.component.less']
})
export class CourseFormPageComponent implements OnInit, NavPage {

  course: Course = null;
  mode: string = 'Add';
  courseId: number;
  readyToLoadForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseSrv: CourseService,
    private navSrv: NavService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe(data => {;
      if (data['id'] !== undefined) {
        this.mode = 'Edit';
        this.courseId = Number(data['id']);
        if (isNaN(this.courseId) === true) {
          return this.router.navigate(['/404']);
        }
        this.loadCourse(this.courseId);
      } else {
        this.readyToLoadForm = true;
        this.notifyBreadCrumbs();
      }
    });
  }

  loadCourse(id: number): void {
    this.courseSrv.getCourse(id)
    .subscribe((course: Course) => {
      this.course = course;
      this.readyToLoadForm = true;
      this.notifyBreadCrumbs();
    });
  }

  notifyBreadCrumbs(): void {
    const breadCrumParams: BreadCrumParamsInterface = {
      breadcrumbs: this.navSrv.nav_state.course,
      params: {id: this.course ? this.course.id : ' - New'}
    };
    this.navSrv.state$.next(breadCrumParams);
  }

}
