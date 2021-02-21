import { UserActions, UserActionsTypes } from './interface';

export interface UserState {
  ratedAppAt: number | null;
}

const initialState: UserState = {
  ratedAppAt: null,
};

export const user = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionsTypes.RATE_APP:
      return { ...state, ratedAppAt: Date.now() };
    default:
      return state;
  }
};
