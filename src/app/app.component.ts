import { Component, OnInit } from '@angular/core';
import { LoginService } from './modules/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isLogin: boolean = true;

  constructor(private loginSrv: LoginService) {}

  ngOnInit() {
    this.loginSrv.getLoginStatus().subscribe(isLogin => {
      this.isLogin = isLogin;
    })
  }
}
