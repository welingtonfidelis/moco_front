import {
  START_LOAD, STOP_LOAD
} from "./types";

export const cashRegisterReportDownloadStartLoading = () => ({
  type: START_LOAD,
});

export const cashRegisterReportDownloadStopLoading = () => ({
  type: STOP_LOAD,
});

