export interface CashRegisterGroupItemReducerInterface {
    id: string;
    description: string;
    observation: string;
    created_at: Date;
    updated_at: Date;
}

export interface CashRegisterGroupReducerInterface {
    loading: boolean;
    page: number;
    limit: number;
    total: number;
    list: CashRegisterGroupItemReducerInterface[];
}
