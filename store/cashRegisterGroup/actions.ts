import { CashRegisterGroupItemReducerInterface } from "./model";
import { 
  START_LIST_LOAD, START_SAVE_LOAD, STOP_LIST_LOAD, 
  STOP_SAVE_LOAD, UPDATE_LIST, START_DELETE_LOAD, STOP_DELETE_LOAD
} from "./types";

export const cashRegisterGroupStartListLoading = () => ({
  type: START_LIST_LOAD,
});

export const cashRegisterGroupStopListLoading = () => ({
  type: STOP_LIST_LOAD,
});

export const cashRegisterGroupStartSaveLoading = () => ({
  type: START_SAVE_LOAD,
});

export const cashRegisterGroupStopSaveLoading = () => ({
  type: STOP_SAVE_LOAD,
});

export const cashRegisterGroupStartDeleteLoading = (payload: number) => ({
  type: START_DELETE_LOAD,
  payload
});

export const cashRegisterGroupStopDeleteLoading = (payload: number) => ({
  type: STOP_DELETE_LOAD,
  payload
});

export const cashRegisterGroupUpdateList = (payload: CashRegisterGroupItemReducerInterface[]) => ({
  type: UPDATE_LIST,
  payload
});

