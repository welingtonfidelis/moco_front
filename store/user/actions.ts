import { UserReducerInterface } from "./model";
import { LOGIN, LOGOUT, START_LOGIN_LOAD, STOP_LOGIN_LOAD, UPDATE_TOKEN } from "./types";

export const userLogin = (payload: UserReducerInterface) => ({
  type: LOGIN,
  payload
});

export const userLogout = () => ({
  type: LOGOUT
});

export const userStartLoginLoading = () => ({
  type: START_LOGIN_LOAD,
});

export const userStopLoginLoading = () => ({
  type: STOP_LOGIN_LOAD,
});

export const userUpdateToken = (token: string) => ({
  type: UPDATE_TOKEN,
  payload: token
});