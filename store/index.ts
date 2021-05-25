import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";

import user from './user/reducers';
import login from './login/reducers';
import cashRegisterGroup from './cashRegisterGroup/reducers';
import cashRegisterGroupSimple from './cashRegisterGroupSimple/reducers';
import cashRegister from './cashRegister/reducers';

const reducers = combineReducers({
    user,
    login,
    cashRegisterGroup,
    cashRegisterGroupSimple,
    cashRegister
});

const makeStore = () => {
    const store = createStore(reducers);

    return store;
}

export const storeWrapper = createWrapper(makeStore);