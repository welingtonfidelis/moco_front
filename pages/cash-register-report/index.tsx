import { Spin, Empty, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonPrimary } from '../../components/button';
import { Input } from '../../components/input';
import moment from 'moment';
import { downloadFileBufferService, getService } from '../../services/apiRequest';
import {
    cashRegisterGroupSimpleStartListLoading, cashRegisterGroupSimpleStopListLoading,
    cashRegisterGroupSimpleUpdateList
} from '../../store/cashRegisterGroupSimple/actions';
import { maskDate, maskValue } from '../../util';
import { CashRegisterGroupSimpleReducerInterface } from '../../store/cashRegisterGroupSimple/model';
import { CashOnHandReducerInterface } from '../../store/cashOnHand/model';
import { Select } from '../../components/select';
import { RangePicker } from '../../components/datePicker';
import {
    cashOnHandStartLoading, cashOnHandStopLoading, cashOnHandUpdateValue
} from '../../store/cashOnHand/actions';
import { LoadingOutlined } from '@ant-design/icons';
import {
    cashRegisterReportStartListLoading, cashRegisterReportUpdateList
} from '../../store/cashRegisterReport/actions';
import { CashRegisterReportReducerInterface } from '../../store/cashRegisterReport/model';
import { CashRegisterReportDownlaodReducerInterface } from '../../store/cashRegisterReportDownload/model';
import {
    cashRegisterReportDownloadStartLoading, cashRegisterReportDownloadStopLoading
} from '../../store/cashRegisterReportDownload/actions';

export default function CashRegisterReport() {
    const [total, setTotal] = useState(0);
    const [reloadList, setReloadList] = useState(0);
    const [descriptionSearch, setDescriptionSearch] = useState('');
    const [cashRegisterGroupSearch, setCashRegisterGroupSearch] = useState('');
    const [typeSearch, setTypeSearch] = useState('');
    const [dateStartSearch, setDateStartSearch] = useState(moment(new Date()));
    const [dateEndSearch, setDateEndSearch] = useState(moment(new Date()));

    const dispatch = useDispatch();

    const cashOnHandInfo = useSelector(
        (
            state: { cashOnHand: CashOnHandReducerInterface }
        ) => state.cashOnHand
    );
    const cashRegisterGroupSimpleInfo = useSelector(
        (
            state: { cashRegisterGroupSimple: CashRegisterGroupSimpleReducerInterface }
        ) => state.cashRegisterGroupSimple
    );
    const cashRegisterReportInfo = useSelector(
        (
            state: { cashRegisterReport: CashRegisterReportReducerInterface }
        ) => state.cashRegisterReport
    );
    const cashRegisterReportDownloadInfo = useSelector(
        (
            state: { cashRegisterReportDownload: CashRegisterReportDownlaodReducerInterface }
        ) => state.cashRegisterReportDownload
    );
    const typeOptions = [
        { description: 'Entrada', value: 'in' },
        { description: 'Saida', value: 'out' },
    ]
    const tableColumns = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            // sorter: (a, b) => a.type.length - b.type.length,
            // sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title: 'Descri????o',
            dataIndex: 'description',
            // sorter: (a, b) => a.description.length - b.description.length,
            // sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title: 'Grupo',
            dataIndex: 'cash_register_group_description',
            // sorter: (a, b) => a.cash_register_group_description.length - b.cash_register_group_description.length,
            // sortDirections: ['ascend', 'descend', 'ascend'],
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            // sorter: (a, b) => a.value - b.value,
        },
        {
            title: 'Data',
            dataIndex: 'paid_in',
            // sorter: (a, b) => moment(a.paid_in).unix() - moment(b.paid_in).unix()
        },
    ];

    useEffect(() => {
        getCashRegisterGroupList();
        getCashOnHandValue();
    }, []);

    useEffect(() => {
        getCashRegisterList();
    }, [reloadList]);

    const mountRequestProps = (url: string, download = false) => {
        const props = {
            url,
            description: null,
            date_start: dateStartSearch.toString(),
            date_end: dateEndSearch.toString(),
            type: null,
            cash_register_group_id: null,
            download_pdf: download
        }

        if (descriptionSearch.length > 2) props.description = descriptionSearch;

        if (typeSearch) props.type = typeSearch;

        if (cashRegisterGroupSearch !== 'undefined' && cashRegisterGroupSearch !== '') {
            props.cash_register_group_id = cashRegisterGroupSearch;
        }

        return props;
    }

    const getCashRegisterList = async () => {
        dispatch(cashRegisterReportStartListLoading());

        const url = '/cash-registers/report';
        const props = mountRequestProps(url);

        const { ok, data } = await getService(props);

        if (ok) {
            dispatch(cashRegisterReportUpdateList({
                loadingList: false,
                date_end: data.date_end,
                date_start: data.date_start,
                expense: data.expense,
                revenue: data.revenue,
                list: data.rows.map((item, index) => {
                    const type = item.type === 'in' ? 'Entrada' : 'Saida';
                    const paid_in = maskDate(new Date(item.paid_in));

                    return { ...item, key: index + 1, type, paid_in }
                })
            }));

            setTotal(data.count);
        }
    }

    const handleDownloadReport = async () => {
        dispatch(cashRegisterReportDownloadStartLoading());

        const url = '/cash-registers/report';
        const props = mountRequestProps(url, true);

        await downloadFileBufferService(props, `relat??rio_${maskDate(new Date())}.pdf`);

        dispatch(cashRegisterReportDownloadStopLoading());
    }

    const getCashRegisterGroupList = async () => {
        dispatch(cashRegisterGroupSimpleStartListLoading());

        const props = {
            url: '/cash-register-groups/list-simple',
        }

        const { ok, data } = await getService(props);

        if (ok) {
            const { rows } = data;

            dispatch(cashRegisterGroupSimpleUpdateList(rows));
        }

        dispatch(cashRegisterGroupSimpleStopListLoading());
    }

    const getCashOnHandValue = async () => {
        dispatch(cashOnHandStartLoading());

        const props = {
            url: '/cash-registers/report/cash-on-hand',
        }

        const { ok, data } = await getService(props);

        if (ok) {
            const { total } = data;
            dispatch(cashOnHandUpdateValue(total));
        }

        dispatch(cashOnHandStopLoading());
    }

    const handleSearchCashRegister = () => {
        setReloadList(reloadList + 1);
    }

    const handleSelectDateSearch = (e) => {
        const start = e ? e[0] : null;
        const end = e ? e[1] : null;

        setDateStartSearch(start);
        setDateEndSearch(end);
    }

    return (
        <div id="cash-register-report-page">
            <Spin spinning={cashRegisterReportInfo.loadingList}>
                <h3>Relat??rio</h3>

                <div className="group-search">
                    <Input
                        placeholder="Descri????o"
                        value={descriptionSearch}
                        onChange={e => setDescriptionSearch(e.target.value)}
                    />

                    <Select
                        placeholder="Tipo"
                        loading={false}
                        onChange={setTypeSearch}
                        list={typeOptions}
                    />

                    <Select
                        placeholder="Grupo"
                        loading={cashRegisterGroupSimpleInfo.loadingList}
                        onChange={setCashRegisterGroupSearch}
                        list={
                            cashRegisterGroupSimpleInfo.list.map(
                                e => ({ value: e.id, description: e.description })
                            )
                        }
                    />

                    <RangePicker
                        value={[dateStartSearch, dateEndSearch]}
                        onChange={e => handleSelectDateSearch(e)}
                        placeholder={['In??cio', 'Fim']}
                        clearIcon={false}
                    />

                    <div className="group-search-btn">
                        <ButtonPrimary onClick={handleSearchCashRegister}>
                            Buscar
                        </ButtonPrimary>

                        <ButtonPrimary
                            onClick={handleDownloadReport}
                            loading={cashRegisterReportDownloadInfo.loading}
                            disabled={total <= 0}
                        >
                            Baixar
                        </ButtonPrimary>
                    </div>
                </div>

                <div className="report-result-head">
                    <div className="top">
                        <div className="col">
                            <strong>De </strong>
                            <span>{maskDate(new Date(cashRegisterReportInfo.date_start))}</span>
                            <strong> at?? </strong>
                            <span>{maskDate(new Date(cashRegisterReportInfo.date_end))}</span>
                        </div>

                        <div className="col">
                            <strong>Total em caixa: </strong>  {
                                cashOnHandInfo.loading
                                    ? <LoadingOutlined />
                                    : <span>{maskValue(cashOnHandInfo.value)}</span>
                            }
                        </div>
                    </div>

                    <div className="bottom">
                        <div className="col">
                            <strong>Receitas: </strong>
                            <span>{maskValue(cashRegisterReportInfo.revenue)}</span>
                        </div>

                        <div className="col">
                            <strong>Despesas: </strong>
                            <span>{maskValue(cashRegisterReportInfo.expense)}</span>
                        </div>
                    </div>
                </div>

                <div className="group-list">
                    {
                        total > 0
                            ? <Table
                                columns={tableColumns}
                                dataSource={cashRegisterReportInfo.list}
                                pagination={{ hideOnSinglePage: true, position: ['bottomCenter'] }}
                            />

                            : <Empty description="Esta lista est?? vazia." />
                    }
                </div>
            </Spin>
        </div>
    )
}