import { Injectable } from '@angular/core';
import { Profile, ACTIVE_USER } from '../profile/profile.model';
import { AppLocalStorage } from '../../common/storage/localStorage';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { RequestsService } from '../../common/requests/requests.service';
import { HeaderParam } from '../../common/requests/header-params.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  
  public loginStatus$: ReplaySubject<boolean>;
  private activeUser: Profile|null = null;
  public error: Object;
  private token: string|null = null;

  constructor(
    private requestSrv: RequestsService
  ) {
    this.loginStatus$ = new ReplaySubject<boolean>();
  }

  getLoginStatus(): ReplaySubject<boolean> {
    return this.loginStatus$;
  }

  onLogin(token: string): void {
    AppLocalStorage.setItem(ACTIVE_USER, token);
    this.token = token;
    this.loginStatus$.next(true);
  }

  login(login: string, password: string): Observable<any> {
    return this.requestSrv.request('auth/login', 'Post', {login, password});
  }

  logout(): boolean {
    AppLocalStorage.removeItem(ACTIVE_USER);
    this.activeUser = null;
    this.token = null;
    this.loginStatus$.next(false);
    return true;
  }

  private _getToken(): string {
    return this.token || (AppLocalStorage.getItem(ACTIVE_USER) ? AppLocalStorage.getItem(ACTIVE_USER).toString() : null);
  }

  private _getActiveProfileData(): Observable<Profile> {
    return this.requestSrv.request('auth/userinfo','Post', null, null);
  }

  isLogin(): boolean {
    const isLogin =  this._getToken() !== null && this._getToken() !== undefined;
    this.loginStatus$.next(isLogin);
    return isLogin;
  }

  getActiveProfile():Observable<Profile> {
    if (this.activeUser !== null ) {
      return Observable.of(this.activeUser);
    } else {
      return this._getActiveProfileData();
    }
  }

  setActiveProfile(user: Profile): Profile {
    this.activeUser = new Profile(
      user.id,
      user.login,
      '',
      user.name
    );

    return this.activeUser;
  }

  getFullName(name: {first: string, last: string}) {
    return `${name.first}  ${name.last}`;
  }
}
