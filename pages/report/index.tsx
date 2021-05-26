import { Spin, Pagination, Empty, Form, Radio } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonPrimary } from '../../components/button';
import { Input, InputTextArea } from '../../components/input';
import { ListItem } from '../../components/listItem';
import { Modal } from '../../components/modal';
import { CashRegisterReducerInterface } from '../../store/cashRegister/model';
import { UserReducerInterface } from '../../store/user/model';
import { haveToken } from '../../services/auth';
import moment from 'moment';
import { listService } from '../../services/crud';
import {
    cashRegisterStartDeleteLoading, cashRegisterStartListLoading,
    cashRegisterStartSaveLoading, cashRegisterStopDeleteLoading,
    cashRegisterStopListLoading, cashRegisterStopSaveLoading, cashRegisterUpdateList
} from '../../store/cashRegister/actions';
import {
    cashRegisterGroupSimpleStartListLoading, cashRegisterGroupSimpleStopListLoading,
    cashRegisterGroupSimpleUpdateList
} from '../../store/cashRegisterGroupSimple/actions';
import { maskDate, maskValue } from '../../util';
import { CashRegisterGroupSimpleReducerInterface } from '../../store/cashRegisterGroupSimple/model';
import { CashOnHandReducerInterface } from '../../store/cashOnHand/model';
import { Select } from '../../components/select';
import { DatePicker, RangePicker } from '../../components/datePicker';
import { cashOnHandStartLoading, cashOnHandStopLoading, cashOnHandUpdateValue } from '../../store/cashOnHand/actions';
import { LoadingOutlined } from '@ant-design/icons';

export default function Report() {
    useEffect(() => {
        if (haveToken(userInfo)) {
            getCashRegisterGroupList();
            getCashOnHandValue();
        }
    }, []);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [reloadList, setReloadList] = useState(0);
    const [seletedUpdate, setSelectedUpdate] = useState('');
    const [descriptionSearch, setDescriptionSearch] = useState('');
    const [cashRegisterGroupSearch, setCashRegisterGroupSearch] = useState('');
    const [typeSearch, setTypeSearch] = useState('');
    const [dateStartSearch, setDateStartSearch] = useState(moment(new Date()));
    const [dateEndSearch, setDateEndSearch] = useState(moment(new Date()));
    const [showModal, setShowModal] = useState(false);

    const [form] = Form.useForm();
    const buttonRef = useRef(null)
    const dispatch = useDispatch();
    const userInfo = useSelector(
        (
            state: { user: UserReducerInterface }
        ) => state.user
    );
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
    const typeOptions = [
        { description: 'Entrada', value: 'in' },
        { description: 'Saida', value: 'out' },
    ]
    const url = '/cash-registers/report';
    const authorization = userInfo.token;

    useEffect(() => {
        getCashRegisterList();
    }, [page, limit, reloadList]);

    const getCashRegisterList = async () => {
        // dispatch(cashRegisterStartListLoading());

        // const props = {
        //     url,
        //     authorization,
        //     description: null,
        //     date_start: null,
        //     date_end: null,
        //     cash_register_group_id: null
        // }

        // if (descriptionSearch.length > 2) props.description = descriptionSearch;
        // if (dateStartSearch && dateEndSearch) {
        //     props.date_start = new Date(dateStartSearch);
        //     props.date_end = new Date(dateEndSearch);
        // }
        // if (cashRegisterGroupSearch !== 'undefined' && cashRegisterGroupSearch !== '') {
        //     props.cash_register_group_id = cashRegisterGroupSearch;
        // }

        // const { rows, count } = await listAllService(props);

        // dispatch(cashRegisterUpdateList(rows));
        // setTotal(count);

        // dispatch(cashRegisterStopListLoading());
    }

    const getCashRegisterGroupList = async () => {
        dispatch(cashRegisterGroupSimpleStartListLoading());

        const props = {
            url: '/cash-register-groups/list-simple',
            authorization
        }

        const data = await listService(props);

        if(data.ok) {
            const { rows } = data;

            dispatch(cashRegisterGroupSimpleUpdateList(rows));
        }

        dispatch(cashRegisterGroupSimpleStopListLoading());
    }

    const getCashOnHandValue = async () => {
        dispatch(cashOnHandStartLoading());

        const props = {
            url: '/cash-registers/report/cash-on-hand',
            authorization
        }

        const data = await listService(props);

        console.log('->', data);
        if(data.ok) {
            const { total } = data;
            dispatch(cashOnHandUpdateValue(total));
        }

        dispatch(cashOnHandStopLoading());
    }

    const handleSearchCashRegister = () => {
        setPage(1);
        setReloadList(reloadList + 1);
    }

    const handleSelectDateSearch = (e) => {
        const start = e ? e[0] : null;
        const end = e ? e[1] : null;

        setDateStartSearch(start);
        setDateEndSearch(end);
    }

    return (
        <div id="cash-register-page">
            <Spin spinning={false}>
                <h3>Relatório</h3>

                <div className="group-search">
                    <Input
                        placeholder="Descrição"
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
                        placeholder={['Início', 'Fim']}
                        clearIcon={false}
                    />

                    <div className="group-search-btn">
                        <ButtonPrimary onClick={() => handleSearchCashRegister()}>
                            Buscar
                        </ButtonPrimary>

                        <ButtonPrimary onClick={() => console.log('baixar')}>
                            Baixar
                        </ButtonPrimary>
                    </div>
                </div>

                <div className="report-head">
                    <div className="cash-on-hand">
                        Total em caixa: {
                            cashOnHandInfo.loading 
                                ? <LoadingOutlined />
                                :cashOnHandInfo.value
                        }
                    </div>
                </div>

                <div className="group-list">
                    {
                        total > 0
                            ? <h1>resultado</h1>

                            : <Empty description="Esta lista está vazia." />
                    }
                </div>
            </Spin>
        </div>
    )
}