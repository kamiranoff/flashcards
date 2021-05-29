import { UserActions, UserActionsTypes } from './interface';
import { getLoginMethod } from '../../utils';

export interface UserState {
  ratedAppAt: number | null;
  hasSentInvite: boolean;
  name: string | null;
  picture: string | null;
  givenName: string | null;
  sub: string | null;
  error: null | string;
  loginMethod: null | string;
}

const initialState: UserState = {
  ratedAppAt: null,
  hasSentInvite: false,
  name: null,
  picture: null,
  givenName: null,
  sub: null,
  error: null,
  loginMethod: null,
};

export const user = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionsTypes.CLEAR_USER_ERROR:
      return { ...state, error: null };
    case UserActionsTypes.SAVE_USER_AUTH0_ERROR:
    case UserActionsTypes.SAVE_USER_DB_ERROR:
      return { ...state, error: 'Something went wrong' };
    case UserActionsTypes.RATE_APP:
      return { ...state, ratedAppAt: Date.now() };
    case UserActionsTypes.SENT_INVITE:
      return { ...state, hasSentInvite: true };
    case UserActionsTypes.SAVE_USER:
      return {
        ...state,
        name: action.name,
        givenName: action.givenName,
        picture: action.picture,
        sub: action.sub,
        loginMethod: getLoginMethod(action.sub),
        error: null,
      };
    case UserActionsTypes.DELETE_USER:
      return {
        ...state,
        name: null,
        picture: null,
        givenName: null,
        sub: null,
      };
    default:
      return state;
  }
};
