import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Profile } from '../profile/profile.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeLast'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLogin: boolean;
  activeUser: Profile|false;
  auth$: Subscription;

  constructor(private loginSrv: LoginService) { }

  ngOnInit() {
    this.auth$ = this.loginSrv.getLoginStatus()
    .subscribe(isLogin => {
      this.isLogin = isLogin;
      this.activeUser = this.loginSrv.getActiveProfile();
    });

    this.loginSrv.isLogin();
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }

  login() {
    this.loginSrv.getLoginStatus().next(false);
  }

  logout() {
    this.loginSrv.logout();
  }

}
