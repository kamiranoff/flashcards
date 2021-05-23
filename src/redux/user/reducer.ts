import { UserActions, UserActionsTypes } from './interface';

export interface UserState {
  ratedAppAt: number | null;
  hasSentInvite: boolean;
  name: string | null;
  picture: string | null;
  givenName: string | null;
  sub: string | null;
}

const initialState: UserState = {
  ratedAppAt: null,
  hasSentInvite: false,
  name: null,
  picture: null,
  givenName: null,
  sub: null,
};

export const user = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
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
