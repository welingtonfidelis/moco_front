import { HYDRATE } from "next-redux-wrapper";
import { LOGIN, LOGOUT, START_LOGIN_LOAD, START_PROFILE_LOAD, STOP_LOGIN_LOAD, STOP_PROFILE_LOAD, UPDATE_PROFILE, UPDATE_TOKEN } from "./types";

const initialState = {
    name: null,
    email: null,
    token: null,
    user: null,
    ongName: null,
    phone: null,
    birth: null,
    address: null,

    loadingLogin: false,
    loadingProfile: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: {
            return { ...state, ...action.payload.user }
        }

        case LOGIN: {
            localStorage.setItem('moco_user_token', action.payload.token);

            const newState = { ...state, loadingLogin: false, ...action.payload }
            return newState;
        }

        case LOGOUT: {
            localStorage.removeItem('moco_user_token');

            const newState = {
                name: null,
                email: null,
                token: null,
                user: null,
                ongName: null,
                phone: null,
                birth: null,
                address: null,
            }
            return newState;
        }

        case START_LOGIN_LOAD: {
            const newState = { ...state, loadingLogin: true }
            return newState;
        }

        case STOP_LOGIN_LOAD: {
            const newState = { ...state, loadingLogin: false }
            return newState;
        }

        case UPDATE_TOKEN: {
            localStorage.setItem('moco_user_token', action.payload.token);

            const newState = { ...state, token: action.payload }
            return newState;
        }

        case START_PROFILE_LOAD: {
            const newState = { ...state, loadingProfile: true }
            return newState;
        }

        case STOP_PROFILE_LOAD: {
            const newState = { ...state, loadingProfile: false }
            return newState;
        }

        case UPDATE_PROFILE: {
            const newState = { ...state, ...action.payload }
            return newState;
        }

        default: {
            return state;
        }
    }
};

export default reducer;