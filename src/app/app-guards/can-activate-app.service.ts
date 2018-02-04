import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from '../modules/login/login.service';

@Injectable()
export class CanActivateAppService implements CanActivate {

  constructor(
    private router: Router,
    private logingSrv: LoginService
  ) { }

  canActivate(): Observable<boolean> {
    let isLogin = this.logingSrv.isLogin();

    if (isLogin === false ) {
      this.router.navigate(['login']);
    }
    return Observable.of(isLogin);
    
  }

}
