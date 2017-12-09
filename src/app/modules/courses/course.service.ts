import { Injectable } from '@angular/core';
import { Course } from './course/course.model';

@Injectable()
export class CourseService {
  private courses: Array<Course>;

  constructor() { 
    this.courses = [
      {
        id: 1,
        title: 'Statistics with R',
        description: 'Master Statistics with R. Statistical mastery of data analysis including inference, modeling, and Bayesian approaches.',
        date: new Date(2016, 4, 1),
        duration: 300
      },
      {
        id: 2,
        title: 'Excel to MySQL: Analytic Techniques for Business Specialization',
        description: 'Turn Data Into Value. Drive business process change by identifying & analyzing key metrics in 4 industry-relevant courses.',
        date: new Date(2017, 5, 10),
        duration: 6000
      },
      {
        id: 3,
        title: 'Applied Data Science with Python',
        description: 'Gain new insights into your data . Learn to apply data science methods and techniques, and acquire analysis skills.',
        date: new Date(2017, 10, 3),
        duration: 5000
      }
    ];
  }

  getCourses(): Array<Course> {
    return this.courses;
  }

}
