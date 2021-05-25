export interface CashRegisterGroupSimpleItemReducerInterface {
    id: string;
    description: string;
}

export interface CashRegisterGroupSimpleReducerInterface {
    loadingList: boolean;
    list: CashRegisterGroupSimpleItemReducerInterface[];
}
