export interface CashRegisterGroupItemReducerInterface {
    id: string;
    description: string;
    observation: string;
    created_at: Date;
    updated_at: Date;
    loadingDelete: boolean;
}

export interface CashRegisterGroupReducerInterface {
    loadingList: boolean;
    loadingSave: boolean;
    list: CashRegisterGroupItemReducerInterface[];
}
