import { START_LOAD, STOP_LOAD } from "./types";

export const loginStartLoading = () => ({
  type: START_LOAD,
});

export const loginStopLoading = () => ({
  type: STOP_LOAD,
});