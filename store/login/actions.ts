import { START_LOAD, STOP_LOAD } from "./types";

export const startLoading = () => ({
  type: START_LOAD,
});

export const stopLoading = () => ({
  type: STOP_LOAD,
});