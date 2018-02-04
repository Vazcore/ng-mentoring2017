import { Component, OnInit } from '@angular/core';
import {NavService, BreadCrumParamsInterface} from '../../modules/nav/nav.service';
import {NavPage} from '../../modules/nav/nav-page.interface';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.less']
})
export class CoursesPageComponent implements OnInit, NavPage {

  constructor(
    private navSrv: NavService
  ) { }

  ngOnInit() {
    this.notifyBreadCrumbs();
  }

  notifyBreadCrumbs() {
    const breadCrumbParams: BreadCrumParamsInterface = {
      breadcrumbs: this.navSrv.nav_state.courses,
      params: null
    };
    this.navSrv.state$.next(breadCrumbParams);
  }

}
