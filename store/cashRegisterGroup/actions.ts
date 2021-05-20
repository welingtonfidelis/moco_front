import { CashRegisterGroupReducerInterface } from "./model";
import { 
  START_LIST_LOAD, START_SAVE_LOAD, STOP_LIST_LOAD, 
  STOP_SAVE_LOAD, UPDATE_LIST, START_DELETE_LOAD, STOP_DELETE_LOAD
} from "./types";

export const startListLoading = () => ({
  type: START_LIST_LOAD,
});

export const stopListLoading = () => ({
  type: STOP_LIST_LOAD,
});

export const startSaveLoading = () => ({
  type: START_SAVE_LOAD,
});

export const stopSaveLoading = () => ({
  type: STOP_SAVE_LOAD,
});

export const startDeleteLoading = (payload: number) => ({
  type: START_DELETE_LOAD,
  payload
});

export const stopDeleteLoading = (payload: number) => ({
  type: STOP_DELETE_LOAD,
  payload
});

export const updateList = (payload: CashRegisterGroupReducerInterface[]) => ({
  type: UPDATE_LIST,
  payload
});

