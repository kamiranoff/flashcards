export enum UserActionsTypes {
  RATE_APP = 'RATE_APP',
  SENT_INVITE = 'SENT_INVITE',
  SAVE_USER = 'SAVE_USER',
  DELETE_USER = 'DELETE_USER',
  SAVE_USER_TO_DB = 'SAVE_USER_TO_DB',
}

export interface RateApp {
  type: typeof UserActionsTypes.RATE_APP;
}

export interface SentInviteToFriends {
  type: typeof UserActionsTypes.SENT_INVITE;
}

export interface SaveUser {
  type: typeof UserActionsTypes.SAVE_USER;
  name: string;
  givenName: string;
  picture: string;
  sub: string;
}

export interface DeleteUser {
  type: typeof UserActionsTypes.DELETE_USER;
}

export type UserActions = RateApp | SentInviteToFriends | SaveUser | DeleteUser;
