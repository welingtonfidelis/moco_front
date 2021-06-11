import React, { useEffect, useState } from "react"
import { Button, Collapse, Dropdown, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    HomeOutlined, DollarCircleOutlined,
    SnippetsOutlined, BarChartOutlined,
    UserOutlined, LogoutOutlined, LoadingOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { FaUserCircle } from 'react-icons/fa';

import HomePage from '../home';
import CashRegisterPage from '../cash-register';
import CashRegisterGroupPage from '../cash-register-group';
import CashRegisterReportPage from '../cash-register-report';
import Router from "next/router";
import { Modal } from "../../components/modal";
import { Menu } from '../../components/menu';
import { 
    userLogout, userStartProfileLoading, userStopProfileLoading, 
    userUpdateProfile 
} from "../../store/user/actions";
import { DatePicker } from "../../components/datePicker";
import { Input, InputMask, InputPassword, InputTextArea } from "../../components/input";
import { getService, patchService } from "../../services/apiRequest";
import { UserReducerInterface } from "../../store/user/model";
import moment from "moment";
import { ButtonPrimary } from "../../components/button";

export default function Home() {
    const [selectedPage, setSelectedPage] = useState(<HomePage />);
    const [showModal, setShowModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const [formProfile] = Form.useForm();
    const [formProfilePassword] = Form.useForm();
    const dispatch = useDispatch();
    const userInfo = useSelector(
        (
            state: { user: UserReducerInterface }
        ) => state.user
    );

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        dispatch(userStartProfileLoading());

        const props = {
            url: '/users/profile',
        }

        const { ok, data } = await getService(props);

        if (ok) {
            dispatch(userUpdateProfile({
                ...data,
                ongName: data.ong_name
            }));
        }

        dispatch(userStopProfileLoading());
    }

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
            title: 'Perfil',
            icon: <UserOutlined />,
            action: () => handleOpenProfile(),
        },
        {
            title: 'Suporte',
            icon: <MailOutlined />,
            action: () => Router.push('/contact'),
        },
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

    const handleOpenProfile = () => {
        formProfile.setFieldsValue({
            ...userInfo,
            birth: moment(userInfo.birth)
        });

        formProfilePassword.setFieldsValue({
            old_password: null,
            new_password: null,
            confirm_password: null,
        });

        setShowProfileModal(true);
    }

    const handleSaveProfile = async (values: any) => {
        dispatch(userStartProfileLoading());

        const { ok } = await patchService({
            url: 'users/profile',
            id: '',
            values: {
                birth: new Date(values.birth),
                name: values.name,
                phone: values.phone,
                address: values.address,
            },
        });

        if (ok) dispatch(userUpdateProfile({ loadingProfile: false, ...values }));
    }

    const handleSavePassword = async (values: any) => {
        dispatch(userStartProfileLoading());

        const { ok } = await patchService({
            url: 'users/profile/update-password',
            id: '',
            values: {
                old_password: values.old_password,
                new_password: values.new_password,
            },
            successMessage: {
                title: 'Sucesso!',
                message: 'Sua senha foi atualizada com sucesso.'
            },
            errorMessage: {
                title: 'Falha!',
                message: 'Houve um problema ao atualizar sua senha. Por favor, '+
                'confirme se sua senha atual está correta, se a nova possui mínimo de '+
                '4 dígitos e tente novamente.',
            },
            validationToken: false
        });

        if(ok) {
            formProfilePassword.setFieldsValue({
                old_password: null,
                new_password: null,
                confirm_password: null,
            });
        }

        dispatch(userStopProfileLoading());
    }

    return (
        <div id="main-page">
            <header>
                <img src="/assets/images/logo_transparent.png" alt="Logo" />

                <Dropdown
                    trigger={['click']}
                    overlay={(
                        <Menu
                            items={userMenuOptions}
                        />
                    )}
                >
                    <Button shape="circle">
                        {
                            userInfo.loadingProfile
                                ? <LoadingOutlined />
                                : <FaUserCircle />
                        }
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

            <Modal
                className="modal-profile"
                title="Perfil"
                isVisible={showProfileModal}
                onOk={() => { formProfile.submit() }}
                onCancel={() => setShowProfileModal(false)}
                confirmLoading={userInfo.loadingProfile}
            >
                <Form
                    onFinish={handleSaveProfile}
                    form={formProfile}
                >
                    <div className="profile-header">
                        <UserOutlined />

                        <div className="col">
                            <Form.Item name="user">
                                <Input
                                    disabled
                                    title="Usuário"
                                />
                            </Form.Item>

                            <Form.Item name="email" >
                                <Input
                                    disabled
                                    title="Email"
                                />
                            </Form.Item>

                            <Form.Item name="ongName" >
                                <Input
                                    disabled
                                    title="Nome da ONG"
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="profile-main">
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: "Insira um nome" }]}
                        >
                            <Input
                                placeholder="Seu nome"
                                title="Seu nome"
                            />
                        </Form.Item>

                        <div className="col">
                            <Form.Item
                                name="phone"
                            >
                                <InputMask
                                    mask="(99) 9 9999-9999"
                                    type="tel"
                                    placeholder="Seu telefone"
                                />
                            </Form.Item>

                            <Form.Item
                                name="birth"
                                rules={[{ required: true, message: "Escolha uma data" }]}
                            >
                                <DatePicker
                                    placeholder="Data de nascimento"
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="address"
                        >
                            <InputTextArea
                                placeholder="Seu endereço"
                                title="Seu endereço"
                            />
                        </Form.Item>
                    </div>
                </Form>

                <div className="profile-password">
                    <Collapse accordion>
                        <Collapse.Panel header="Alterar Senha" key="1">
                            <Form
                                onFinish={handleSavePassword}
                                form={formProfilePassword}
                            >
                                <Form.Item
                                    name="old_password"
                                    rules={[{ required: true, message: "Insira sua senha atual" }]}
                                >
                                    <InputPassword
                                        placeholder="Senha atual"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="new_password"
                                    rules={[{ required: true, message: "Insira sua nova senha" }]}
                                >
                                    <InputPassword
                                        placeholder="Senha"
                                        allowClear
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirm_password"
                                    dependencies={['new_password']}
                                    rules={[
                                        { required: true, message: "Confirme sua nova senha" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('new_password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Confirme sua nova senha'));
                                            },
                                        })
                                    ]}
                                >
                                    <InputPassword
                                        placeholder="Confirmar senha"
                                        allowClear
                                    />
                                </Form.Item>

                                <ButtonPrimary
                                    onClick={(() => formProfilePassword.submit())}
                                    loading={userInfo.loadingProfile}
                                >
                                    Atualizar
                                    </ButtonPrimary>
                            </Form>
                        </Collapse.Panel>
                    </Collapse>
                </div>
            </Modal>
        </div>
    )
}