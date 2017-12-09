import { Injectable } from '@angular/core';
import { Profile, ACTIVE_USER } from '../profile/profile.model';
import { AppLocalStorage } from '../../common/storage/localStorage';
import { EventEmitter } from '@angular/core';

@Injectable()
export class LoginService {
  
  public loginStatus$: EventEmitter<boolean> = new EventEmitter<boolean>(); 

  constructor() { }

  getLoginStatus(): EventEmitter<boolean> {
    return this.loginStatus$;
  }

  login(username: string, password: string): Profile {
    let profile = new Profile(
      1, "user1", "pass1", "User1"
    );
    AppLocalStorage.setItem(ACTIVE_USER, profile);
    this.loginStatus$.emit(true);
    return profile;
  }

  logout(): boolean {
    AppLocalStorage.removeItem(ACTIVE_USER);
    this.loginStatus$.emit(false);
    return true;
  }

  private _getActiveProfileData(): object|string|false {
    return AppLocalStorage.getItem(ACTIVE_USER);
  }

  isLogin(): boolean {
    return this._getActiveProfileData() !== null;
  }

  getActiveProfile():Profile|false {
    let profileData = this._getActiveProfileData();
    return (profileData instanceof Profile) ? profileData : false; 
  }
}
