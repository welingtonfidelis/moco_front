import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";
import user from './user/reducers';
import login from './login/reducers';
import cashRegisterGroup from './cashRegisterGroup/reducers';

const reducers = combineReducers({
    user,
    login,
    cashRegisterGroup
});

const makeStore = () => {
    const store = createStore(reducers);

    return store;
}

export const storeWrapper = createWrapper(makeStore);