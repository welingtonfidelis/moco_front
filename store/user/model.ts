export interface UserLoginReducerInterface {
    token: string;
    loadingLogin: boolean;
}

export interface UserReducerInterface {
    name: string;
    email: string;
    token?: string;
    user: string;
    ongName: string;
    phone?: string;
    birth: Date;
    address?: string;

    loadingProfile: boolean;
    loadingLogin: boolean;
}
