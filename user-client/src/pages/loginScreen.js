/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { login } from '../api';
import { message, Form, Icon, Input, Button, Checkbox } from 'antd';

// const NTUEmailRegex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ntu.edu)\.sg$/;

const LoginForm = (props) => {
  const { getFieldDecorator, validateFields } = props.form;

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
    <div style={{ width: '60%', maxWidth: '400px' }}>
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your ntu email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email address"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="float-right" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="w-full" onClick={(e) => { handleSubmit(e) }} >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default () => {

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center mt-20">GEEENESIS LOGO</div>
      <div className="flex justify-center items-center mt-32">
        <WrappedNormalLoginForm />
      </div>

    </div>
  )
}