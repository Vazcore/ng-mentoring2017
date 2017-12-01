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

  constructor(private courseSrv: CourseService) {}

  ngOnInit() {
    this.courses = this.courseSrv.getCourses();
  }

  onDelete(course: Course) {
    console.log(course);
  }

  find(keyword: string) {
    console.log(keyword);
  }

}
