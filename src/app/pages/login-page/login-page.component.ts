import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../modules/login/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import {NavService, BreadCrumInterface, BreadCrumParamsInterface} from '../../modules/nav/nav.service';
import {NavPage} from '../../modules/nav/nav-page.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit, OnDestroy, NavPage {
  login: string;
  password: string;
  loginSub: Subscription;
  error;

  constructor(
    private router: Router,
    private loginSrv: LoginService,
    private navSrv: NavService
  ) { }

  ngOnInit() {
    this.notifyBreadCrumbs();
  }

  onSubmit() {
    this.loginSub = this.loginSrv.login(this.login, this.password)
    .subscribe(login => {
      this.loginSrv.onLogin(login.token);
      this.router.navigate(['courses']);
    }, error => {
      this.error = 'Auth Error!!!';
    });
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  notifyBreadCrumbs() {
    const breadCrumbParams: BreadCrumParamsInterface = {
      breadcrumbs: this.navSrv.nav_state.login,
      params: null
    };
    this.navSrv.state$.next(breadCrumbParams);
  }

}
