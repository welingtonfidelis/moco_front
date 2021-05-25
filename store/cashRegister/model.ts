import { CashRegisterGroupItemReducerInterface } from "../cashRegisterGroup/model";

export interface CashRegisterItemReducerInterface {
    id: string;
    description: string;
    observation: string;
    type: string;
    paid_in: Date;
    value: number;
    cash_register_group: CashRegisterGroupItemReducerInterface;
    created_at: Date;
    updated_at: Date;
    loadingDelete: boolean;
}

export interface CashRegisterReducerInterface {
    loadingList: boolean;
    loadingSave: boolean;
    list: CashRegisterItemReducerInterface[];
}
