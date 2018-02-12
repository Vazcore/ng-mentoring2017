import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Profile } from '../profile/profile.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeLast'; 
import { Subscribable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as actions from './login.actions';
import * as fromLogin from './login.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLogin: boolean;
  activeUser: Profile|false;
  auth$: Subscription;
  userInfo$: Subscription;

  constructor(
    private store: Store<fromLogin.State>,
    private router: Router,
    private loginSrv: LoginService
  ) { }

  ngOnInit() {
    this.store.select(fromLogin.selectAll)
    .subscribe((data: Profile[]) => {
      this.activeUser = data[0] || false;
    });
    this.auth$ = this.loginSrv.getLoginStatus()
    .subscribe(isLogin => {
      this.isLogin = isLogin;
      if (isLogin === true) {
        this.getUserInfo();
      }
    });

    this.loginSrv.isLogin();
  }

  getUserInfo() {
    this.userInfo$ = this.loginSrv.getActiveProfile()
    .subscribe(user => {
      this.store.dispatch(new actions.Login(user));
    });
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
    if (this.userInfo$) {
      this.userInfo$.unsubscribe();
    }
  }

  login() {
    this.loginSrv.getLoginStatus().next(false);
  }

  logout() {
    this.loginSrv.logout();
    this.store.dispatch(new actions.Logout());
    this.router.navigate(['login']);
  }

}
