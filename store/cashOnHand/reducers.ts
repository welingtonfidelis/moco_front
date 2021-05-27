import { HYDRATE } from "next-redux-wrapper";
import { 
    START_LOAD, STOP_LOAD, UPDATE_VALUE
} from "./types";

const initialState = {
    loading: false,
    value: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...action.payload.cashronhand }
        }

        case START_LOAD: {
            const newState = { ...state, loading: true };
            
            return newState;
        }

        case STOP_LOAD: {
            const newState = { ...state, loading: false };
            
            return newState;
        }
        
        case UPDATE_VALUE: {
            const newState = { ...state, value: action.payload }
            
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default reducer;