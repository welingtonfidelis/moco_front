import React, { useState } from "react"
import { Button, Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import {
    HomeOutlined, DollarCircleOutlined,
    SnippetsOutlined, BarChartOutlined,
    UserOutlined, LogoutOutlined,
} from '@ant-design/icons';

import HomePage from '../home';
import CashRegisterPage from '../cash-register';
import CashRegisterGroupPage from '../cash-register-group';
import CashRegisterReportPage from '../cash-register-report';
import Router from "next/router";
import { Modal } from "../../components/modal";
import { Menu } from '../../components/menu';
import { userLogout } from "../../store/user/actions";
import { GetServerSideProps } from "next";
import { handleHaveToken } from "../../services/auth";

export default function Home() {
    const [selectedPage, setSelectedPage] = useState(<HomePage />);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const menuOptions = [
        {
            title: 'Principal',
            icon: <HomeOutlined />,
            action: () => setSelectedPage(<HomePage />)
        },
        {
            title: 'Caixa',
            icon: <DollarCircleOutlined />,
            action: () => setSelectedPage(<CashRegisterPage />)
        },
        {
            title: 'Grupo de caixa',
            icon: <SnippetsOutlined />,
            action: () => setSelectedPage(<CashRegisterGroupPage />)
        },
        {
            title: 'Relatório',
            icon: <BarChartOutlined />,
            action: () => setSelectedPage(<CashRegisterReportPage />)
        },
    ]

    const userMenuOptions = [
        {
            title: 'Sair do sistema',
            icon: <LogoutOutlined />,
            action: () => setShowModal(true),
            danger: true,
        }
    ]

    const handleLogout = () => {
        setShowModal(false);
        dispatch(userLogout());

        Router.replace('/');
    }

    return (
        <div id="main-page">
            <header>
                <img src="/assets/images/logo_transparent.png" alt="Logo" />

                <Dropdown
                    overlay={(
                        <Menu
                            items={userMenuOptions}
                        />
                    )}
                >
                    <Button shape="circle" >
                        <UserOutlined />
                    </Button>
                </Dropdown>
            </header>

            <main >
                <div className="lateral-menu">
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        inlineCollapsed={true}
                        items={menuOptions}
                    />
                </div>

                <div className="page-container">
                    {selectedPage}
                </div>
            </main>

            <Modal
                title="Sair do sistema"
                okText="Sim"
                cancelText="Não"
                isVisible={showModal}
                onOk={handleLogout}
                onCancel={() => setShowModal(false)}
            >
                Deseja realmente sair do sistema?
            </Modal>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = handleHaveToken(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}