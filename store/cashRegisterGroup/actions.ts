import { CashRegisterGroupReducerInterface } from "./model";
import { 
  START_LOAD, STOP_LOAD, UPDATE_LIST
} from "./types";

export const startLoading = () => ({
  type: START_LOAD,
});

export const stopLoading = () => ({
  type: STOP_LOAD,
});

export const updateList = (payload: CashRegisterGroupReducerInterface[]) => ({
  type: UPDATE_LIST,
  payload
});

