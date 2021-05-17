import { HYDRATE } from "next-redux-wrapper";
import { LOGIN } from "./types";

const initialState = {
    name: 'testeeee',
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.settings };

        case LOGIN:
            const newState = { ...state, ...action.payload };
            return newState;

        default:
            return state;
    }
};

export default reducer;