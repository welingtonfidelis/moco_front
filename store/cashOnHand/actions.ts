import {
  START_LOAD, STOP_LOAD, UPDATE_VALUE
} from "./types";

export const cashOnHandStartLoading = () => ({
  type: START_LOAD,
});

export const cashOnHandStopLoading = () => ({
  type: STOP_LOAD,
});

export const cashOnHandUpdateValue = (payload: number) => ({
  type: UPDATE_VALUE,
  payload
});

