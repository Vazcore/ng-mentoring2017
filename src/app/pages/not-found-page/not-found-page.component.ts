import { Component, OnInit } from '@angular/core';
import {NavService, BreadCrumInterface, BreadCrumParamsInterface} from '../../modules/nav/nav.service';
import {NavPage} from '../../modules/nav/nav-page.interface';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.less']
})
export class NotFoundPageComponent implements OnInit, NavPage {

  constructor(
    private navSrv: NavService
  ) { }

  ngOnInit() {
    this.notifyBreadCrumbs();
  }

  notifyBreadCrumbs() {
    const breadCrumbParams: BreadCrumParamsInterface = {
      breadcrumbs: this.navSrv.nav_state.notFound,
      params: null
    };
    this.navSrv.state$.next(breadCrumbParams);
  }

}
