import Head from 'next/head'
import Router from 'next/router'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from 'antd';
import { Input } from '../../components/input';
import { UserOutlined } from '@ant-design/icons';
import { ButtonPrimary } from '../../components/button';
import { Notification } from '../../components/notification';
import { loginStartLoading, loginStopLoading } from '../../store/login/actions';
import { LoginReducerInterface } from '../../store/login/model';

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const loginInfo = useSelector((state: { login: LoginReducerInterface }) => state.login);

  const handleLogin = async (values: any) => {
    try {
      dispatch(loginStartLoading());

    //   const data = await 

      dispatch(loginStopLoading());

    //   Notification({
    //     type: 'success',
    //     message: 'Sucesso',
    //     description: `Seja bem vindo(a) ${data.name}.`
    //   });

      Router.replace('/main');

    } catch (error) {
      dispatch(loginStopLoading());

      setErrorMessage('Usuário ou senha incorretos');

      const message = 'Houve um erro ao efetuar o login. Por favor, ' +
        'confirme se seu usuário e senha estão corretos.';

      Notification({
        type: 'error',
        message: 'Login',
        description: message,
      });
    }
  }

  return (
    <div id="reset-password-page">
      <main>
        <img src="/assets/images/logo_transparent.png" alt="Logo" />

        <strong>
          Vamos recuperar sua senha.
          <br />
          Insira seu usuário ou email abaixo.
        </strong>

        <Form
          onFinish={handleLogin}
        >
          <Form.Item
            name="user"
            rules={[{ required: true, message: "Insira seu usário ou email" }]}
          >
            <Input
              placeholder="Usuário ou email"
              suffix={<UserOutlined />}
              allowClear
            />
          </Form.Item>

          <div className="login-error-message">
            <span>{errorMessage}</span>
          </div>

          <ButtonPrimary
            htmlType="submit"
            loading={loginInfo.loading}
          >
            Entrar
            </ButtonPrimary>
        </Form>

        <a href="#">Não tenho cadastro</a>
      </main>
    </div>
  )
}
