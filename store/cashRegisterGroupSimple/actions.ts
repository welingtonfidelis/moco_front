import { CashRegisterGroupSimpleItemReducerInterface } from "./model";
import {
  START_LIST_LOAD, STOP_LIST_LOAD, UPDATE_LIST
} from "./types";

export const cashRegisterGroupSimpleStartListLoading = () => ({
  type: START_LIST_LOAD,
});

export const cashRegisterGroupSimpleStopListLoading = () => ({
  type: STOP_LIST_LOAD,
});

export const cashRegisterGroupSimpleUpdateList = (
  payload: CashRegisterGroupSimpleItemReducerInterface[]
) => ({
  type: UPDATE_LIST,
  payload
});

