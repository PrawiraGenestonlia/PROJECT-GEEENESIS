import { useState, useEffect } from 'react';
import router from 'next/router';
import { login } from '../api';
import getConfig from 'next/config';
import { Button, InputItem, List, Toast } from 'antd-mobile';
import isAuth from '../utils/isAuth';
import Swal from 'sweetalert2';

const { publicRuntimeConfig } = getConfig();

const NTUEmailRegex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ntu.edu)\.sg$/;

function LoginPage() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [err, setErr] = useState({ email: false, password: false });

  useEffect(() => {
    if (isAuth()) {
      router.push(`${publicRuntimeConfig.basePath}/`);
    }
  }, []);

  const handleEmailInput = (input) => {
    //validation
    if (NTUEmailRegex.test(String(input).toLowerCase())) {
      setErr({ ...err, email: false });
    } else {
      setErr({ ...err, email: true });
    }
    setUser({ ...user, email: input });
  }

  const handlePasswordInput = (input) => {
    setUser({ ...user, password: input });
  }

  const handleLoginClick = async (input) => {
    login(user).then(res => {
      localStorage.setItem('auth-token', res);
      window.location.reload();
    }).catch(async err => {
      let message = err ? (err.data ? err.data : JSON.stringify(err)) : JSON.stringify(err);
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      });
    })
  }

  const handleEmailError = async () => {
    if (err.email) {
      await Swal.fire({
        icon: 'info',
        text: 'Please enter NTU Email Address',
      });
    }
  }

  return (
    <>
      <div className="w-full" style={{ width: '100%' }}>
        <List renderHeader={() => 'Login'}>
          <InputItem
            className=""
            type="text"
            name="email"
            placeholder="NTU email address"
            error={err.email}
            onErrorClick={handleEmailError}
            onChange={(e) => { handleEmailInput(e) }}
            value={user.email}>
            Email
            </InputItem>
          <InputItem
            className=""
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => { handlePasswordInput(e) }}
            value={user.password}>
            Password
            </InputItem>
        </List>
        <Button onClick={() => { handleLoginClick(user) }}>Login</Button>
      </div>

    </>
  )
}

export default LoginPage;