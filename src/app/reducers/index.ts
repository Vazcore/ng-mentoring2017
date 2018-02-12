import { ActionReducerMap } from '@ngrx/store';
import { courseReducer } from '../modules/courses/courses.reducer';
import { loginReducer } from '../modules/login/login.reducer';

export const reducers: ActionReducerMap<any> = {
  courses: courseReducer,
  login: loginReducer
};