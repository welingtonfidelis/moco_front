import { UserInterface } from "./model";
import { LOGIN } from "./types";

export const login = (payload: UserInterface) => ({
  type: LOGIN,
  payload
});
