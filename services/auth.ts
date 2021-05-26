import Router from 'next/router';
import { UserReducerInterface } from "../store/user/model";

export const haveToken = (user: UserReducerInterface) => {
    if (!user|| !user.token || user.token === ''){
        Router.replace('/');
        
        return false;
    }

    return true;
}

export const handleUnauthorized = (statusCode: number) => {
    if (statusCode && statusCode === 401) {
        Router.replace('/');

        return 'Token inválido ou expirado. Por favor, faça o login novamente.'
    }
}