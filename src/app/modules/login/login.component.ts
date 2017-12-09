import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLogin: boolean;

  constructor(private loginSrv: LoginService) { }

  ngOnInit() {
    this.isLogin = this.loginSrv.isLogin();
    this.loginSrv.getLoginStatus().subscribe(isLogin => {
      this.isLogin = isLogin;
    });
  }

  ngOnDestroy() {
    // clear sub
  }

  login() {
    this.loginSrv.getLoginStatus().emit(false);
  }

  logout() {
    this.loginSrv.logout();
  }

}
