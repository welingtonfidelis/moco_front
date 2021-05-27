export interface CashRegisterReportItemReducerInterface {
    key: number;
    id: string;
    description: string;
    type: string;
    paid_in: Date;
    value: number;
    cash_register_group_description: string;
}

export interface CashRegisterReportReducerInterface {
    loadingList: boolean;
    expense: number;
    revenue: number;
    profit: number;
    date_start: Date;
    date_end: Date;
    list: CashRegisterReportItemReducerInterface[];
}
