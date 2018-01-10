import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course/course.model';
import { FilterByPipe } from '../../common/filter/filter-by.pipe';

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

  constructor(
    private courseSrv: CourseService,
    private filterByPipe: FilterByPipe
  ) {}

  ngOnInit() {
    this.courses = this.courseSrv.getCourses();
    this.initialCourses = this.courseSrv.copyCourses(this.courses);
  }

  onDelete(course: Course) {
    console.log(course);
  }

  find(keyword: string) {
    this.courses = this.filterByPipe.transform<Course>(this.initialCourses, 'title', keyword);
    console.log(keyword);
  }

}
