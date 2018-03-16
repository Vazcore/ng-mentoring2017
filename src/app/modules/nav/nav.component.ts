import { Component, OnInit } from '@angular/core';
import { NavService, BreadCrumInterface, BreadCrumParamsInterface } from './nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public breadCrumbs: Array<string>;

  constructor(
    private navSrv: NavService
  ) { }

  ngOnInit() {
    this.navSrv.state$
    .subscribe((data: BreadCrumParamsInterface) => {
      this.breadCrumbs = data.breadcrumbs.process(data);
    })
  }

  createLink(breadcrumbs: Array<string>):string {
    let val =  breadcrumbs.reduce((prev, cur, index, all): string => {
      if (index < all.length - 1) {
        return prev + '/' + cur.toLowerCase();
      } else {
        return prev;
      }
    }, '');

    return val;
  }

}
