import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './modules/login/login.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  isLogin: boolean = false;
  auth$: Subscription;

  constructor(private loginSrv: LoginService) {}

  ngOnInit() {
    this.auth$ = this.loginSrv.getLoginStatus().subscribe(isLogin => {
      setTimeout(() => {
        this.isLogin = isLogin;
      }, 1);
    })
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }
}
