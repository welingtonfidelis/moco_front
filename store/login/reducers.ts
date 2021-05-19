import { HYDRATE } from "next-redux-wrapper";
import { START_LOAD, STOP_LOAD } from "./types";

const initialState = {
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...action.payload.login };
        }

        case START_LOAD: {
            const newState = { ...state, loading: true };
            return newState;
        }

        case STOP_LOAD: {
            const newState = { ...state, loading: false };
            return newState;
        }

        default:
            return state;
    }
};

export default reducer;