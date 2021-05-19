import { HYDRATE } from "next-redux-wrapper";
import { LOGIN, LOGOUT } from "./types";

const initialState = {
    name: null,
    email: null,
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...action.payload.user }
        }

        case LOGIN: {
            const newState = { ...state, ...action.payload }
            return newState;
        }

        case LOGOUT: {
            const newState = { name: null, email: null, token: null }
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default reducer;