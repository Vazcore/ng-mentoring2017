import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Profile } from '../profile/profile.model';
import { LoginActions, LOGIN, LOGOUT } from './login.actions';

export const loginAdapter = createEntityAdapter<Profile|null>();
export interface State extends EntityState<Profile|null> {}
const defaultLogin = null;

export const initialState: State = loginAdapter.getInitialState(defaultLogin);

export function loginReducer(
  state: State = initialState,
  action: LoginActions
) {

  switch(action.type) {
    case LOGIN:
      return loginAdapter.addOne(action.profile, state);
    case LOGOUT:
      return loginAdapter.removeAll(state);
    default:
      return state;
  }
}

export const getLoginState = createFeatureSelector<State>('login');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = loginAdapter.getSelectors(getLoginState);
