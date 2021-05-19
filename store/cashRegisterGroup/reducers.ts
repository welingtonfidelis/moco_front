import { HYDRATE } from "next-redux-wrapper";
import { 
    START_LOAD, STOP_LOAD, UPDATE_LIST
} from "./types";

const initialState = {
    loading: false,
    page: 1,
    limit: 10,
    total: 0,
    list: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...action.payload.cashregistergroup }
        }

        case START_LOAD: {
            const newState = { ...state, loading: true };
            return newState;
        }

        case STOP_LOAD: {
            const newState = { ...state, loading: false };
            return newState;
        }
        
        case UPDATE_LIST: {
            const newState = { ...state, list: action.payload }
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default reducer;