import { CashRegisterItemReducerInterface } from "./model";
import { 
  START_LIST_LOAD, START_SAVE_LOAD, STOP_LIST_LOAD, 
  STOP_SAVE_LOAD, UPDATE_LIST, START_DELETE_LOAD, STOP_DELETE_LOAD
} from "./types";

export const cashRegisterStartListLoading = () => ({
  type: START_LIST_LOAD,
});

export const cashRegisterStopListLoading = () => ({
  type: STOP_LIST_LOAD,
});

export const cashRegisterStartSaveLoading = () => ({
  type: START_SAVE_LOAD,
});

export const cashRegisterStopSaveLoading = () => ({
  type: STOP_SAVE_LOAD,
});

export const cashRegisterStartDeleteLoading = (payload: number) => ({
  type: START_DELETE_LOAD,
  payload
});

export const cashRegisterStopDeleteLoading = (payload: number) => ({
  type: STOP_DELETE_LOAD,
  payload
});

export const cashRegisterUpdateList = (payload: CashRegisterItemReducerInterface[]) => ({
  type: UPDATE_LIST,
  payload
});

