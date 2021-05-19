import { UserReducerInterface } from "./model";
import { LOGIN, LOGOUT } from "./types";

export const login = (payload: UserReducerInterface) => ({
  type: LOGIN,
  payload
});

export const logout = () => ({
  type: LOGOUT
});