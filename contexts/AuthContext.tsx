import { createContext, useEffect } from "react";
import { parseCookies } from 'nookies'
import { useDispatch } from "react-redux";
import {  userUpdateToken } from "../store/user/actions";

type AuthContextType = {}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const { moco_user_token: token } = parseCookies();

        if (token) dispatch(userUpdateToken(token));
    }, []);

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}