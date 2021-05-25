import { HYDRATE } from "next-redux-wrapper";
import { 
    START_LIST_LOAD, START_SAVE_LOAD, STOP_LIST_LOAD, 
    STOP_SAVE_LOAD, UPDATE_LIST, START_DELETE_LOAD, STOP_DELETE_LOAD
} from "./types";

const initialState = {
    loadingList: false,
    loadingSave: false,
    list: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...action.payload.cashregister }
        }

        case START_LIST_LOAD: {
            const newState = { ...state, loadingList: true };
            
            return newState;
        }

        case STOP_LIST_LOAD: {
            const newState = { ...state, loadingList: false };
            
            return newState;
        }

        case START_SAVE_LOAD: {
            const newState = { ...state, loadingSave: true };
            
            return newState;
        }

        case STOP_SAVE_LOAD: {
            const newState = { ...state, loadingSave: false };
            
            return newState;
        }

        case START_DELETE_LOAD: {
            const index = action.payload;
            const newList = state.list;
            newList[index] = { ...newList[index], loadingDelete: true };
            const newState = { ...state, list: newList};
            
            return newState;
        }

        case STOP_DELETE_LOAD: {
            const index = action.payload;
            const newList = state.list;
            newList[index] = { ...newList[index], loadingDelete: false };
            const newState = { ...state, list: newList};
            
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