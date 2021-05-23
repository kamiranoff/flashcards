import { DeleteUser, SaveUser, UserActionsTypes } from './interface';

export const triggerRateApp = () => ({ type: UserActionsTypes.RATE_APP });

export const sentInviteToFriends = () => ({ type: UserActionsTypes.SENT_INVITE });

export const saveUser = (sub: string, name: string, givenName: string, picture: string): SaveUser => ({
  type: UserActionsTypes.SAVE_USER,
  name,
  givenName,
  picture,
  sub,
});

export const saveUserToDB = () => ({
  type: UserActionsTypes.SAVE_USER_TO_DB,
});

export const deleteUser = (): DeleteUser => ({
  type: UserActionsTypes.DELETE_USER,
});
