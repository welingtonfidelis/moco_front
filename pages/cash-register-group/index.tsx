import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { Spin, Pagination, Empty } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonPrimary } from '../../components/button';
import { InputSearch } from '../../components/input';
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
                <h3>Registro de caixa</h3>

                <div className="group-search">
                    <InputSearch
                        placeholder="Descrição"
                        onSearch={(e) => { console.log(e) }}
                    />

                    <ButtonPrimary>
                        Novo
                    </ButtonPrimary>
                </div>

                <div className="group-list">
                    {
                        total > 0 
                        ? cashRegisterGroupInfo.list.map((item, index) => (
                                <div className="group-list-item" key={index}>
                                    <div className="group-list-icon"></div>
    
                                    <strong>{item.description}</strong>
    
                                    <div className="group-list-action">
                                        <EditOutlined title="Editar" />
    
                                        <DeleteFilled title="Excluir" />
                                    </div>
                                </div>
                            ))
                        
                        : <Empty description="Esta lista está vazia."/>
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
        </div>
    )
}