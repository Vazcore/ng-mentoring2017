import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface BreadCrumInterface {
  values: Array<string>;
  process: any;
}

export interface BreadCrumParamsInterface {
  breadcrumbs: BreadCrumInterface;
  params: any;
}

@Injectable()
export class NavService {
  
  public nav_state:{[prop: string]: BreadCrumInterface} = {
    courses: {values:['Courses'], process: this.proccessCoursesRoute },
    course: {values: ['Courses', '', ], process: this.proccessCourseRoute},
    login: {values:['Login'], process: this.proccessCoursesRoute },
    notFound: {values:['404'], process: this.proccessCoursesRoute }
  };

  public state$: Subject<BreadCrumParamsInterface> = new Subject<BreadCrumParamsInterface>();

  constructor() { }

  proccessCoursesRoute(breadcrumbsWthParams: BreadCrumParamsInterface): Array<string> {
    return breadcrumbsWthParams.breadcrumbs.values;
  }

  proccessCourseRoute(breadcrumbsWthParams: BreadCrumParamsInterface): Array<string> {
    let values = breadcrumbsWthParams.breadcrumbs.values;
    values[values.length - 1] = 'Course ' + breadcrumbsWthParams.params.id;
    return values;
  }

}
