import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import { parseCookies } from 'nookies';

export const handleUnauthorized = (statusCode: number) => {
    if (statusCode && statusCode === 401) {
        Router.replace('/');

        return 'Token inválido ou expirado. Por favor, faça o login novamente.'
    }
}

export const handleHaveToken = (ctx: GetServerSidePropsContext) => {
    const { moco_user_token: token } = parseCookies(ctx);

    return token;
}