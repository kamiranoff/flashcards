export enum UserActionsTypes {
  RATE_APP = 'RATE_APP',
  SENT_INVITE = 'SENT_INVITE',
  SAVE_USER = 'SAVE_USER',
  DELETE_USER = 'DELETE_USER',
  SAVE_USER_TO_DB = 'SAVE_USER_TO_DB',
  SAVE_USER_AUTH0_ERROR = 'SAVE_USER_AUTH0_ERROR',
  CLEAR_USER_ERROR = 'CLEAR_USER_ERROR',
  SAVE_USER_DB_ERROR = 'SAVE_USER_DB_ERROR',
}

export interface RateApp {
  type: typeof UserActionsTypes.RATE_APP;
}

export interface SentInviteToFriends {
  type: typeof UserActionsTypes.SENT_INVITE;
}

export interface SaveUser {
  type: typeof UserActionsTypes.SAVE_USER;
  sub: string;
  name: string;
  givenName: string;
  picture: string;
}

export interface DeleteUser {
  type: typeof UserActionsTypes.DELETE_USER;
}

export interface SaveUserAuth0Error {
  type: typeof UserActionsTypes.SAVE_USER_AUTH0_ERROR;
}

export interface SaveUserDBError {
  type: typeof UserActionsTypes.SAVE_USER_DB_ERROR;
}

export interface ClearUserError {
  type: typeof UserActionsTypes.CLEAR_USER_ERROR;
}

export type UserActions =
  | RateApp
  | SentInviteToFriends
  | SaveUser
  | DeleteUser
  | SaveUserAuth0Error
  | ClearUserError
  | SaveUserDBError;
