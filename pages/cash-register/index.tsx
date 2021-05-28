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
import {
    createService, deleteService, listService, updateService
} from '../../services/apiRequest';
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
import { Select } from '../../components/select';
import { DatePicker, RangePicker } from '../../components/datePicker';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function CashRegister() {
    useEffect(() => {
        if(haveToken(userInfo)) {
            getCashRegisterGroupList();
        }
    }, []);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [reloadList, setReloadList] = useState(0);
    const [seletedUpdate, setSelectedUpdate] = useState('');
    const [descriptionSearch, setDescriptionSearch] = useState('');
    const [cashRegisterGroupSearch, setCashRegisterGroupSearch] = useState('');
    const [dateStartSearch, setDateStartSearch] = useState(null);
    const [dateEndSearch, setDateEndSearch] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [form] = Form.useForm();
    const buttonRef = useRef(null)
    const dispatch = useDispatch();
    const userInfo = useSelector(
        (
            state: { user: UserReducerInterface }
        ) => state.user
    );
    const cashRegisterInfo = useSelector(
        (
            state: { cashRegister: CashRegisterReducerInterface }
        ) => state.cashRegister
    );
    const cashRegisterGroupSimpleInfo = useSelector(
        (
            state: { cashRegisterGroupSimple: CashRegisterGroupSimpleReducerInterface }
        ) => state.cashRegisterGroupSimple
    );
    const typeOptions = [
        { label: 'Entrada', value: 'in' },
        { label: 'Saida', value: 'out' },
    ]
    const url = '/cash-registers';
    const authorization = userInfo.token;

    useEffect(() => {
        getCashRegisterList();
    }, [page, limit, reloadList]);

    const getCashRegisterList = async () => {
        dispatch(cashRegisterStartListLoading());

        const props = {
            url,
            limit,
            page,
            authorization,
            description: null,
            date_start: null,
            date_end: null,
            cash_register_group_id: null
        }

        if (descriptionSearch.length > 2) props.description = descriptionSearch;
        if (dateStartSearch && dateEndSearch) {
            props.date_start = new Date(dateStartSearch);
            props.date_end = new Date(dateEndSearch);
        }
        if (cashRegisterGroupSearch !== 'undefined' && cashRegisterGroupSearch !== '') {
            props.cash_register_group_id = cashRegisterGroupSearch;
        }

        const data = await listService(props);

        if(data.ok) {
            const { rows, count } = data;

            dispatch(cashRegisterUpdateList(rows));
            setTotal(count);
        }

        dispatch(cashRegisterStopListLoading());
    }

    const getCashRegisterGroupList = async () => {
        dispatch(cashRegisterGroupSimpleStartListLoading());

        const props = {
            url: '/cash-register-groups/list-simple',
            authorization
        }

        const data = await listService(props);

        if(data.ok) {
            const { rows, count } = data;

            dispatch(cashRegisterGroupSimpleUpdateList(rows));
        }

        dispatch(cashRegisterGroupSimpleStopListLoading());
    }

    const handleSaveCashRegister = async (values: any) => {
        dispatch(cashRegisterStartSaveLoading());

        let noErrors = false;

        if (seletedUpdate !== '') {
            const { ok } = await updateService({
                id: seletedUpdate,
                url,
                values,
                authorization
            });

            noErrors = ok;
        }
        else {
            values.paid_in = new Date(values.paid_in);

            const { ok } = await createService({
                url,
                values,
                authorization
            });

            noErrors = ok;
        }

        dispatch(cashRegisterStopSaveLoading());

        if (noErrors) {
            handleClearForm();

            setReloadList(reloadList + 1);
        }
    }

    const handleSelectCashRegister = (index: number) => {
        const {
            id, description, observation, cash_register_group,
            paid_in, type, value,
        } = cashRegisterInfo.list[index];

        setSelectedUpdate(id);

        form.setFieldsValue({
            observation,
            description,
            cash_register_group_id: cash_register_group.id,
            type, value, paid_in: moment(paid_in)
        });

        setShowModal(true);
    }

    const handleSearchCashRegister = () => {
        setPage(1);
        setReloadList(reloadList + 1);
    }

    const handleDeleteCashRegister = async (index: number) => {
        dispatch(cashRegisterStartDeleteLoading(index));

        const { id } = cashRegisterInfo.list[index];

        const { ok } = await deleteService({
            id,
            url,
            authorization
        });

        dispatch(cashRegisterStopDeleteLoading(index));

        if (ok) setReloadList(reloadList + 1);
    }

    const handleClearForm = () => {
        setShowModal(false)
        form.resetFields();
        setSelectedUpdate('');
    }

    const handleSelectDateSearch = (e) => {
        const start = e ? e[0] : null;
        const end = e ? e[1] : null;

        setDateStartSearch(start);
        setDateEndSearch(end);
    }

    return (
        <div id="cash-register-page">
            <Spin spinning={cashRegisterInfo.loadingList}>
                <h3>Registros de caixa</h3>

                <div className="group-search">
                    <Input
                        placeholder="Descrição"
                        value={descriptionSearch}
                        onChange={e => setDescriptionSearch(e.target.value)}
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
                    />

                    <div className="group-search-btn">
                        <ButtonPrimary onClick={() => handleSearchCashRegister()}>
                            Buscar
                        </ButtonPrimary>

                            <ButtonPrimary onClick={() => setShowModal(true)}>
                                Novo
                        </ButtonPrimary>
                    </div>
                </div>

                <div className="group-list">
                    {
                        total > 0
                            ? cashRegisterInfo.list.map((item, index) => (
                                <ListItem
                                    key={index}
                                    title={item.description}
                                    subtitle={item.cash_register_group.description}
                                    detail1={maskValue(item.value)}
                                    detail2={maskDate(new Date(item.paid_in))}
                                    onEdit={() => handleSelectCashRegister(index)}
                                    onDelete={() => handleDeleteCashRegister(index)}
                                    onDeleteLoad={item.loadingDelete}
                                    icon={
                                        item.type === 'in' 
                                            ? <PlusCircleOutlined /> 
                                            : <MinusCircleOutlined />
                                    }
                                />
                            ))

                            : <Empty description="Esta lista está vazia." />
                    }
                </div>

                <Pagination
                    defaultCurrent={page}
                    defaultPageSize={limit}
                    onChange={(e) => setPage(e)}
                    onShowSizeChange={(e, f) => setLimit(f)}
                    total={total}
                />
            </Spin>

            <Modal
                title="Novo registro de caixa"
                isVisible={showModal}
                onOk={() => { buttonRef.current.click() }}
                onCancel={handleClearForm}
                confirmLoading={cashRegisterInfo.loadingSave}
            >
                <Form
                    onFinish={handleSaveCashRegister}
                    form={form}
                >
                    <Form.Item
                        name="type"
                        rules={[{ required: true, message: "Escolha um tipo" }]}
                    >
                        <Radio.Group
                            options={typeOptions}
                            optionType="button"
                        />
                    </Form.Item>

                    <Form.Item
                        name="paid_in"
                        rules={[{ required: true, message: "Escolha uma data" }]}
                    >
                        <DatePicker
                            placeholder="Data"
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: "Insira uma descrição" }]}
                    >
                        <Input
                            placeholder="Descrição"
                        />
                    </Form.Item>

                    <Form.Item
                        name="cash_register_group_id"
                        rules={[{ required: true, message: "Escolha um grupo" }]}
                    >
                        <Select
                            placeholder="Grupo"
                            loading={cashRegisterGroupSimpleInfo.loadingList}
                            list={
                                cashRegisterGroupSimpleInfo.list.map(e => ({ value: e.id, description: e.description }))
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="value"
                        rules={[{ required: true, message: "Insira um valor" }]}
                    >
                        <Input
                            type="number"
                            placeholder="Valor"
                        />
                    </Form.Item>

                    <Form.Item
                        name="observation"
                    >
                        <InputTextArea
                            placeholder="Observação"
                        />
                    </Form.Item>

                    <button ref={buttonRef} type="submit" hidden />
                </Form>
            </Modal>
        </div>
    )
}