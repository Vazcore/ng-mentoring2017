import { Injectable } from '@angular/core';
import { Course } from './course/course.model';
import { Observable } from 'rxjs/Observable';
import { Paging } from './paging/paging.model';
import { RequestsService } from '../../common/requests/requests.service';
import { QueryParam } from '../../common/requests/query-param.interace';
import 'rxjs/add/observable/of';

@Injectable()
export class CourseService {
  private courses: Array<Course> = [];

  constructor(
    private requetsSrv: RequestsService
  ) {}

  formatPaging(paging: Paging): Array<QueryParam> {
    let params:Array<QueryParam> = [];
    
    for (let key in paging) {
      params.push({param: key, value: paging[key]});
    }

    return params;
  }

  getCourses(paging: Paging, keyword?: string): Observable<Course[]> {
    const params: Array<QueryParam> = this.formatPaging(paging);
    if (keyword) {
      params.push({param: 'keyword', value: encodeURIComponent(keyword)});
    }
    return this.requetsSrv.request('courses', 'Get', null, params);
  }

  updateCourse(course: Course): boolean {
    // todo 
    return true;
  }

  removeCourse(id: number): Observable<any> {
    return this.requetsSrv.request('courses/' + id, 'Delete', null, null, null);
  }

  copyCourses(courses: Course[]): Course[] {
    return courses.map(el => el);
  }

}
