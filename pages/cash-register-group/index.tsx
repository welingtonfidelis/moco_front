import { Spin, Pagination, Empty, Form } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonPrimary } from '../../components/button';
import { Input, InputSearch } from '../../components/input';
import { ListItem } from '../../components/listItem';
import { Modal } from '../../components/modal';
import { api } from '../../services/api';
import { haveToken } from '../../services/auth';
import { startLoading, stopLoading, updateList } from '../../store/cashRegisterGroup/actions';
import { CashRegisterGroupReducerInterface } from '../../store/cashRegisterGroup/model';
import { UserReducerInterface } from '../../store/user/model';

export default function CashRegisterGroup() {
    useEffect(() => {
        haveToken(userInfo);
    }, []);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('');
    const [observation, setObservation] = useState('');

    const buttonRef = useRef(null)
    const dispatch = useDispatch();
    const userInfo = useSelector(
        (state: { user: UserReducerInterface }) => state.user
    );
    const cashRegisterGroupInfo = useSelector(
        (state: { cashRegisterGroup: CashRegisterGroupReducerInterface }) => state.cashRegisterGroup
    );

    useEffect(() => {
        getCashRegisterGroupList();
    }, [page, limit]);

    const getCashRegisterGroupList = async () => {
        try {
            dispatch(startLoading());

            const response = await api.get(
                '/cash-register-groups',
                {
                    params: { limit, page },
                    headers: { authorization: userInfo.token }
                }
            );

            const { data: dataResponse } = response;
            const { data } = dataResponse;

            console.log('->', data);
            dispatch(updateList(data.rows));
            setTotal(data.count);

            dispatch(stopLoading());

        } catch (error) {
            dispatch(stopLoading());

            console.log(error);

        }
    }

    return (
        <div id="cash-register-group-page">
            <Spin spinning={cashRegisterGroupInfo.loading}>
                <h3>Grupos para registro de caixa</h3>

                <div className="group-search">
                    <InputSearch
                        placeholder="Descrição"
                        onSearch={(e) => { console.log(e) }}
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
                                />
                            ))

                            : <Empty description="Esta lista está vazia." />
                    }
                </div>

                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={limit}
                    onChange={(e) => setPage(e)}
                    onShowSizeChange={(e, f) => setLimit(f)}
                    total={total}
                />
            </Spin>

            <Modal
                title="Novo grupo para registro de caixa"
                isVisible={showModal}
                onOk={() => {buttonRef.current.click()}}
                onCancel={() => setShowModal(false)}
            >
                <Form
                    onFinish={(e) => console.log(e)}
                >
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: "Insira uma descrição" }]}
                    >
                        <Input
                            placeholder="Descrição"
                            value={description}
                            allowClear
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="observation"
                    >
                        <Input
                            placeholder="Observação"
                            value={observation}
                            allowClear
                            onChange={e => setObservation(e.target.value)}
                        />
                    </Form.Item>

                    <button ref={buttonRef}  type="submit" hidden/>
                </Form>
            </Modal>
        </div>
    )
}