export interface ProfileInterface {
  id: number;
  login: string;
  password: string;
  name: {first: string, last: string};
}