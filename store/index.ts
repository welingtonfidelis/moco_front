import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";
import user from './user/reducers';
import login from './login/reducers';

const reducers = combineReducers({
    user,
    login
});

const makeStore = () => {
    const store = createStore(reducers);

    return store;
}

export const storeWrapper = createWrapper(makeStore);