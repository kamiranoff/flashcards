import { DeleteUser, SaveUser, UserActionsTypes } from './interface';

export const triggerRateApp = () => ({ type: UserActionsTypes.RATE_APP });

export const sentInviteToFriends = () => ({ type: UserActionsTypes.SENT_INVITE });

export const saveUser = (sub: string, name: string, givenName: string, picture: string): SaveUser => ({
  type: UserActionsTypes.SAVE_USER,
  sub,
  name,
  givenName,
  picture,
});

export const saveUserToDB = () => ({
  type: UserActionsTypes.SAVE_USER_TO_DB,
});

export const deleteUser = (): DeleteUser => ({
  type: UserActionsTypes.DELETE_USER,
});

export const saveUserAuth0Error = () => ({
  type: UserActionsTypes.SAVE_USER_AUTH0_ERROR,
});

export const clearUserError = () => ({
  type: UserActionsTypes.CLEAR_USER_ERROR,
});

export const saveUserDBError = () => ({
  type: UserActionsTypes.SAVE_USER_DB_ERROR,
});
