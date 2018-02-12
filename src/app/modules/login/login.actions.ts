import { Action } from '@ngrx/store';
import { Profile } from '../profile/profile.model';

export const LOGIN  = '[Login] Login';
export const LOGOUT  = '[Login] Logout';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public profile: Profile) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() {}
}

export type LoginActions
= Login
| Logout;