import { useState } from "react"
import { Button, Menu } from 'antd';
import {
    HomeOutlined, DollarCircleOutlined,
    SnippetsOutlined, BarChartOutlined,
    RightCircleOutlined, LeftCircleOutlined
} from '@ant-design/icons';

import HomePage from '../home';
import CashRegisterPage from '../cash-register';
import CashRegisterGroupPage from '../cash-register-group';
import ReportPage from '../report';

export default function Home() {
    const [selectedPage, setSelectedPage] = useState(HomePage);
    const [collapsedMenu, setCollapsedMenu] = useState(true);

    const menuOptions = [
        {
            title: 'Principal',
            icon: <HomeOutlined />,
            page: 'home'
        },
        {
            title: 'Caixa',
            icon: <DollarCircleOutlined />,
            page: 'cashregister'
        },
        {
            title: 'Grupo de caixa',
            icon: <SnippetsOutlined />,
            page: 'cashregistergroup'
        },
        {
            title: 'Relatório',
            icon: <BarChartOutlined />,
            page: 'report'
        },
    ]

    const changePage = (page: string) => {
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

    return (
        <div id="main-page">
            <header>
                <img src="/assets/images/logo_transparent.png" alt="Logo" />
            </header>

            <main >
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    inlineCollapsed={collapsedMenu}
                >
                    {
                        menuOptions.map((item, index) => (
                            <Menu.Item
                                key={index +1}
                                onClick={() => changePage(item.page)}
                                icon={item.icon}
                            >
                                {item.title}
                            </Menu.Item>
                        ))
                    }

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


        </div>
    )
}