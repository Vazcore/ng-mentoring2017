import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {
  login: string;
  password: string;

  constructor(private loginSrv: LoginService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginSrv.login(this.login, this.password);
  }

}
