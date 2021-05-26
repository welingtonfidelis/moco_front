import { Spin, Pagination, Empty, Form } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonPrimary } from '../../components/button';
import { Input, InputSearch, InputTextArea } from '../../components/input';
import { ListItem } from '../../components/listItem';
import { Modal } from '../../components/modal';
import { CashRegisterGroupReducerInterface } from '../../store/cashRegisterGroup/model';
import { UserReducerInterface } from '../../store/user/model';
import { haveToken } from '../../services/auth';
import {
    createService, deleteService, listService, updateService 
} from '../../services/crud';
import {
    cashRegisterGroupStartListLoading, cashRegisterGroupStopListLoading, 
    cashRegisterGroupStartSaveLoading, cashRegisterGroupStopSaveLoading, 
    cashRegisterGroupUpdateList, cashRegisterGroupStartDeleteLoading, 
    cashRegisterGroupStopDeleteLoading
} from '../../store/cashRegisterGroup/actions';

export default function CashRegisterGroup() {
    useEffect(() => {
        haveToken(userInfo);
    }, []);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [reloadList, setReloadList] = useState(0);
    const [seletedUpdate, setSelectedUpdate] = useState('');
    const [descriptionSearch, setDescriptionSearch] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [form] = Form.useForm();
    const buttonRef = useRef(null)
    const dispatch = useDispatch();
    const userInfo = useSelector(
        (state: { user: UserReducerInterface }) => state.user
    );
    const cashRegisterGroupInfo = useSelector(
        (state: { cashRegisterGroup: CashRegisterGroupReducerInterface }) => state.cashRegisterGroup
    );
    const url = '/cash-register-groups';
    const authorization = userInfo.token;

    useEffect(() => {
        getCashRegisterGroupList();
    }, [page, limit, reloadList]);

    const getCashRegisterGroupList = async () => {
        dispatch(cashRegisterGroupStartListLoading());

        const props = {
            url,
            limit,
            page,
            authorization,
            description: null
        }

        if(descriptionSearch.length > 2) props.description = descriptionSearch;

        const data = await listService(props);
        if(data.ok) {
            const { rows, count } = data;

            dispatch(cashRegisterGroupUpdateList(rows));
            setTotal(count);
        }

        dispatch(cashRegisterGroupStopListLoading());
    }

    const handleSaveCashRegisterGroup = async (values: any) => {
        dispatch(cashRegisterGroupStartSaveLoading());

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
            const { ok } = await createService({
                url,
                values,
                authorization
            });

            noErrors = ok;
        }

        dispatch(cashRegisterGroupStopSaveLoading());

        if(noErrors) {
            handleClearForm();
    
            setReloadList(reloadList + 1);
        }
    }

    const handleSelectCashRegisterGroup = (index: number) => {
        const { id, description, observation } = cashRegisterGroupInfo.list[index];

        setSelectedUpdate(id);

        form.setFieldsValue({
            observation,
            description
        });

        setShowModal(true);
    }

    const handleSearchCashRegisterGroup = (description: string) => {
        setDescriptionSearch(description);
        setPage(1);
        setReloadList(reloadList +1);
    }

    const handleDeleteCashRegisterGroup = async (index: number) => {
        dispatch(cashRegisterGroupStartDeleteLoading(index));

        const { id } = cashRegisterGroupInfo.list[index];

        const { ok } = await deleteService({
            id, 
            url,
            authorization 
        });

        dispatch(cashRegisterGroupStopDeleteLoading(index));

        if(ok) setReloadList(reloadList + 1);
    }

    const handleClearForm = () => {
        setShowModal(false)
        form.resetFields();
        setSelectedUpdate('');
    }

    return (
        <div id="cash-register-group-page">
            <Spin spinning={cashRegisterGroupInfo.loadingList}>
                <h3>Grupos para registro de caixa</h3>

                <div className="group-search">
                    <InputSearch
                        placeholder="Descrição"
                        onSearch={(e) => handleSearchCashRegisterGroup(e)}
                    />

                    <ButtonPrimary onClick={() => setShowModal(true)}>
                        Novo
                    </ButtonPrimary>
                </div>

                <div className="group-list">
                    {
                        total > 0
                            ? cashRegisterGroupInfo.list.map((item, index) => (
                                <ListItem
                                    key={index}
                                    title={item.description}
                                    onEdit={() => handleSelectCashRegisterGroup(index)}
                                    onDelete={() => handleDeleteCashRegisterGroup(index)}
                                    onDeleteLoad={item.loadingDelete}
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
                title="Novo grupo para registro de caixa"
                isVisible={showModal}
                onOk={() => { buttonRef.current.click() }}
                onCancel={handleClearForm}
                confirmLoading={cashRegisterGroupInfo.loadingSave}
            >
                <Form
                    onFinish={handleSaveCashRegisterGroup}
                    form={form}
                >
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: "Insira uma descrição" }]}
                    >
                        <Input
                            placeholder="Descrição"
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