export enum UserActionsTypes {
  RATE_APP = 'RATE_APP',
}

export interface RateApp {
  type: typeof UserActionsTypes.RATE_APP;
}

export type UserActions = RateApp;
