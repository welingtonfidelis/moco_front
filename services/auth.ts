import Router from 'next/router';
import { UserReducerInterface } from "../store/user/model";

export const haveToken = (user: UserReducerInterface) => {
    if (!user|| !user.token || user.token === ''){
        Router.replace('/');
    }
}