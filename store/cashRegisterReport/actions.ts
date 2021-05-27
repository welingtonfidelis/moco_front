import { CashRegisterReportReducerInterface } from "./model";
import { 
  START_LIST_LOAD, STOP_LIST_LOAD, UPDATE_LIST
} from "./types";

export const cashRegisterReportStartListLoading = () => ({
  type: START_LIST_LOAD,
});

export const cashRegisterReportStopListLoading = () => ({
  type: STOP_LIST_LOAD,
});

export const cashRegisterReportUpdateList = (payload: CashRegisterReportReducerInterface) => ({
  type: UPDATE_LIST,
  payload
});

