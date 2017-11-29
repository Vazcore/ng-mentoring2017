import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Array<Course>;
  keyword: string = '';

  constructor(private courseSrv: CourseService) {}

  ngOnInit() {
    this.courses = this.courseSrv.getCourses();
  }

  onDelete(course: Course) {
    console.log(course);
  }

  find() {
    console.log(this.keyword);
  }

}
