import { Injectable } from '@angular/core';
import { Course } from './course/course.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class CourseService {
  private courses: Array<Course>;

  constructor() { 
    this.courses = [
      {
        id: 1,
        title: 'Statistics with R',
        description: 'Master Statistics with R. Statistical mastery of data analysis including inference, modeling, and Bayesian approaches.',
        date: new Date(2018, 4, 1),
        duration: 30
      },
      {
        id: 2,
        title: 'Excel to MySQL: Analytic Techniques for Business Specialization',
        description: 'Turn Data Into Value. Drive business process change by identifying & analyzing key metrics in 4 industry-relevant courses.',
        date: new Date(2017, 11, 14),
        duration: 75,
        topRated: true
      },
      {
        id: 3,
        title: 'Applied Data Science with Python',
        description: 'Gain new insights into your data . Learn to apply data science methods and techniques, and acquire analysis skills.',
        date: new Date(2017, 10, 3),
        duration: 55
      }
    ];
  }

  getCourses(): Observable<Course[]> {
    return Observable.of(this.courses);
  }

  createCourse(
    course: Course
  ): boolean {
    let {id, title, description, date, duration} = course;
    this.courses.push(
      new Course(
        id, title, description, date, duration
      )
    );

    return true;
  }

  getCourseById(id: number): Course|null {
    let filtered = this.courses.filter(course => course.id === id);
    return filtered.length ? filtered[0] : null;
  }

  updateCourse(course: Course): boolean {
    // todo 
    return true;
  }

  removeCourse(id: number):boolean {
    this.courses = this.courses.filter(el => {
      return el.id !== id;
    }); 
    return true;
  }

  copyCourses(courses: Course[]): Course[] {
    return courses.map(el => el);
  }

}
