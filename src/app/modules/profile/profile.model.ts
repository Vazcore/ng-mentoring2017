import { ProfileInterface } from './profile.interface';

export class Profile implements ProfileInterface {
  constructor(
    public id: number,
    public login: string,
    public password: string,
    public name: {first: string, last: string} 
  ) {}
}

export const ACTIVE_USER = 'active_user_token';