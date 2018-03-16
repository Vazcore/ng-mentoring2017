import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../modules/login/login.service';

@Injectable()
export class CanActivateLoginService implements CanActivate {

  constructor(
    private loginSrv: LoginService
  ) { }

  canActivate(): Observable<boolean> {
    return Observable.of(this.loginSrv.isLogin() === false);
  }

}
