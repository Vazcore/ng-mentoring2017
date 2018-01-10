import { Injectable } from '@angular/core';
import { Profile, ACTIVE_USER } from '../profile/profile.model';
import { AppLocalStorage } from '../../common/storage/localStorage';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class LoginService {
  
  public loginStatus$: ReplaySubject<boolean>;
  private activeUser: Profile|null = null;

  constructor() {
    this.loginStatus$ = new ReplaySubject<boolean>();
  }

  getLoginStatus(): ReplaySubject<boolean> {
    return this.loginStatus$;
  }

  login(username: string, password: string): Profile {
    let profile = null;
    try {
      profile = new Profile(1, "user1", "pass1", "Aliaksei");  
    } catch (error) {
      this.loginStatus$.next(false);  
    }
    
    this.activeUser = profile;
    AppLocalStorage.setItem(ACTIVE_USER, profile);
    this.loginStatus$.next(true);
    return profile;
  }

  logout(): boolean {
    AppLocalStorage.removeItem(ACTIVE_USER);
    this.activeUser = null;
    this.loginStatus$.next(false);
    return true;
  }

  private _getActiveProfileData(): Profile|null {
    const profile = <Profile>AppLocalStorage.getItem(ACTIVE_USER);
    try {
      this.activeUser = new Profile(profile.id, profile.login, profile.password, profile.name); 
    } catch (error) {
      this.activeUser = null;
    }
    return this.activeUser;
  }

  isLogin(): boolean {
    const isLogin =  this.getActiveProfile() !== null;
    this.loginStatus$.next(isLogin);
    return isLogin;
  }

  getActiveProfile():Profile|null {
    if (this.activeUser !== null ) {
      return this.activeUser;
    } else {
      return this._getActiveProfileData();
    }
  }
}
