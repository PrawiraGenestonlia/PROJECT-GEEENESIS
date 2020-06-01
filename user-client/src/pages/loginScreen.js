/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
// import LogoSVG from '../assets/logo/Logo.svg';
import NTUEEE from '../assets/logo/NTUEEE_GEEENESIS.png';
import { login, forgetPassword } from '../api';
import { Form } from '@ant-design/compatible';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { message, Button, Input, Modal } from 'antd';
// import { FormProvider } from 'antd/lib/form/context';

// const NTUEmailRegex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ntu.edu)\.sg$/;
// const InputEmail = () => (
//   <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
//     <img className="w-8" alt="email svg" src={require('../assets/svg/Email.svg')} />
//     <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="NTU Email Address" aria-label="email" />
//   </div>
// );

// const InputPassword = () => (
//   <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
//     <img className="w-8" alt="password svg" src={require('../assets/svg/Password.svg')} />
//     <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="password" placeholder="password" aria-label="password" />
//   </div>
// );

const layout = {
  // labelCol: {
  //   span: 8,
  // },
  wrapperCol: {
    span: 48,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 48,
  },
};

const LoginForm = (props) => {
  const { getFieldDecorator, validateFields } = props.form;
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [forgetEmail, setForgetEmail] = useState('');

  const handleCancel = () => {
    setShowModal(false);
  }

  const handleForgotPassword = async () => {
    setShowLoading(true);
    forgetPassword(forgetEmail).then((msg) => {
      let messages = msg ? (msg.data ? msg.data : JSON.stringify(msg)) : JSON.stringify(msg);
      message.success(messages, 5);
      setShowLoading(false);
      setShowModal(false);
    }).catch(async (err) => {
      let messages = err ? (err.data ? err.data : JSON.stringify(err)) : JSON.stringify(err);
      message.error(messages, 5);
    });
  }

  const handleSubmit = async () => {
    validateFields((err, values) => {
      if (!err) {
        login(values).then(res => {
          localStorage.setItem('auth-token', res);
          window.location.reload();
        }).catch(async err => {
          let messages = err ? (err.data ? err.data : JSON.stringify(err)) : JSON.stringify(err);
          message.error(messages, 5);
        })
      }
    });
  }

  return (
    <div>
      <Form name="login-form" size="large" {...layout}>
        <Form.Item {...tailLayout}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your ntu email!' }],
          })(
            <Input
              placeholder="NTU Email Address"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />,
          )}
        </Form.Item>
        <Form.Item {...tailLayout}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              type="password"
              placeholder="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />,
          )}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button className="w-full" block type="primary" htmlType="submit" onClick={(e) => { handleSubmit(e) }} >
            Log in
          </Button>
          <a className="float-right" onClick={() => { setShowModal(true) }}>
            Forgot password?
          </a>
        </Form.Item>
      </Form>
      <Modal
        title="Forget Password"
        wrapClassName="text-center"
        visible={showModal}
        onOk={handleForgotPassword}
        confirmLoading={showLoading}
        onCancel={handleCancel} >
        <Input
          value={forgetEmail}
          onChange={(e) => { setForgetEmail(e.target.value) }}
          placeholder="NTU Email Address"
          prefix={<UserOutlined className="site-form-item-icon" />} />
      </Modal>
    </div>
  );
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default () => {
  const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  return (
    <div className="flex flex-col w-screen h-screen" style={{ maxWidth: '2000px', backgroundImage: `url("https://picsum.photos/seed/${new Date().getTime()}/${w}/${h}")`, backgroundSize: 'cover' }}>
      <div className="flex justify-center items-center mt-20">
        <img className="h-48 w-48" alt="logo" src={NTUEEE} />
      </div>
      <div className="flex justify-center items-center" style={{ marginTop: '9rem' }}>
        <div className="flex justify-center p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.5)', width: '80%' }}>
          <WrappedNormalLoginForm />
        </div>
      </div>


    </div>
  )
}