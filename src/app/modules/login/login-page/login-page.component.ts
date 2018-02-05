import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  login: string;
  password: string;
  loginSub: Subscription;
  error;

  constructor(private loginSrv: LoginService) { }

  ngOnInit() {}

  onSubmit() {
    this.loginSub = this.loginSrv.login(this.login, this.password)
    .subscribe(login => {
      this.loginSrv.onLogin(login.token);
    }, error => {
      this.error = 'Auth Error!!!';
    });
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

}
