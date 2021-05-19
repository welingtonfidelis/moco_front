import { useState } from "react"
import { Button, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    HomeOutlined, DollarCircleOutlined,
    SnippetsOutlined, BarChartOutlined,
    RightCircleOutlined, LeftCircleOutlined, UserOutlined, LogoutOutlined
} from '@ant-design/icons';

import HomePage from '../home';
import CashRegisterPage from '../cash-register';
import CashRegisterGroupPage from '../cash-register-group';
import ReportPage from '../report';
import Router from "next/router";
import { Modal } from "../../components/modal";
import { Menu } from '../../components/menu';
import { UserReducerInterface } from "../../store/user/model";
import { logout } from "../../store/user/actions";

export default function Home() {
    const [selectedPage, setSelectedPage] = useState(HomePage);
    const [collapsedMenu, setCollapsedMenu] = useState(true);
    const [showModalLogout, setShowModalLogout] = useState(false);

    const dispatch = useDispatch();
    const userInfo = useSelector((state: { user: UserReducerInterface }) => state.user);

    const menuOptions = [
        {
            title: 'Principal',
            icon: <HomeOutlined />,
            action: () => handleChangePage('home')
        },
        {
            title: 'Caixa',
            icon: <DollarCircleOutlined />,
            action: () => handleChangePage('cashregister')
        },
        {
            title: 'Grupo de caixa',
            icon: <SnippetsOutlined />,
            action: () => handleChangePage('cashregistergroup')
        },
        {
            title: 'Relatório',
            icon: <BarChartOutlined />,
            action: () => handleChangePage('report')
        },
    ]

    const userMenuOptions = [
        {
            title: 'Sair do sistema',
            icon: <LogoutOutlined/>,
            action: () => setShowModalLogout(true),
            danger: true,
        }
    ]

    const handleChangePage = (page: string) => {
        switch (page) {
            case 'home':
                setSelectedPage(HomePage)
                break;

            case 'cashregister':
                setSelectedPage(CashRegisterPage);
                break;

            case 'cashregistergroup':
                setSelectedPage(CashRegisterGroupPage);
                break;

            case 'report':
                setSelectedPage(ReportPage);
                break;
        }
    }

    const handleLogout = () => {
        setShowModalLogout(false);
        dispatch(logout());

        Router.replace('/');
    }

    return (
        <div id="main-page">
            <header>
                <img src="/assets/images/logo_transparent.png" alt="Logo" />

                <Dropdown 
                    overlay={(
                        <Menu
                            itemList={userMenuOptions}
                        />
                    )}
                >
                    <Button shape="circle" >
                        <UserOutlined />
                    </Button>
                </Dropdown>
            </header>

            <main >
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    inlineCollapsed={collapsedMenu}
                    itemList={menuOptions}
                >
                    <div className="ant-menu-expand-button">
                        <Button
                            onClick={() => setCollapsedMenu(!collapsedMenu)}
                            title={collapsedMenu ? 'Expandir menu' : 'Retrair menu'}
                            shape="circle"
                            icon={collapsedMenu ? <RightCircleOutlined /> : <LeftCircleOutlined />}
                            size="middle"
                        />
                    </div>
                </Menu>

                <div>
                    {selectedPage}
                </div>
            </main>

            <Modal 
                title="Sair do sistema"
                isVisible={showModalLogout} 
                onOk={handleLogout} 
                onCancel={() => setShowModalLogout(false)}
            >
                Deseja realmente sair do sistema?
            </Modal>
        </div>
    )
}