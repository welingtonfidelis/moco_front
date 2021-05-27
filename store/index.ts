import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";

import user from './user/reducers';
import login from './login/reducers';
import cashRegisterGroup from './cashRegisterGroup/reducers';
import cashRegisterGroupSimple from './cashRegisterGroupSimple/reducers';
import cashRegister from './cashRegister/reducers';
import cashOnHand from './cashOnHand/reducers';
import cashRegisterReport from './cashRegisterReport/reducers';

const reducers = combineReducers({
    user,
    login,
    cashRegisterGroup,
    cashRegisterGroupSimple,
    cashRegister,
    cashOnHand,
    cashRegisterReport
});

const makeStore = () => {
    const store = createStore(reducers);

    return store;
}

export const storeWrapper = createWrapper(makeStore);