import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Profile } from '../profile/profile.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeLast'; 
import { Subscribable } from 'rxjs/Observable';
import { Router } from '@angular/router';

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
    private router: Router,
    private loginSrv: LoginService
  ) { }

  ngOnInit() {
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
      this.activeUser = this.loginSrv.setActiveProfile(user);
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
    this.router.navigate(['login']);
  }

}
