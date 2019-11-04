import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { LoginToServer } from '../api';
import './css/main.css';
import './css/util.css';

// function validateEmail(email) {
//   var re = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ntu.edu)\.sg$/;
//   return re.test(String(email).toLowerCase());
//   // return email;
// }


export default () => {
  const [email, setEmail] = useState('');
  // const [isNTUEmail, setIsNTUEmail] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {

  }, [email]);

  const handleEmailAddressInput = (input) => {
    setEmail(input);
    // setIsNTUEmail(validateEmail(input));
  }

  const handleLogin = async () => {
    LoginToServer(email, password).then(res => {
      sessionStorage.setItem('active', 1);
      localStorage.setItem('remember', rememberMe);
      localStorage.setItem('auth-token', res.data);
      window.location.reload();
    }).catch(async err => {
      console.log(err);
      let message = err ? (err.data ? err.data : err) : err;
      await Swal.fire('Failed to login!', message, 'error');
    })
  }

  return (
    <div className="login flex w-screen fixed sm:absolute md:fixed overflow-auto">
      <div className="container-login100" style={{ backgroundImage: 'url(' + require('./bg-01.jpg') + ')' }}>
        <div className="wrap-login100 p-4 md:p-16">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-49">
              Login
          </span>
            <div className="wrap-input100 validate-input m-b-23">
              <label className="label-input100">NTU Email Address
              <input className="input100" type="text" name="email" placeholder="Type your email"
                  value={email} onChange={(e) => { handleEmailAddressInput(e.target.value) }}
                />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </label>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <label className="label-input100">Password
              <input className="input100" type="password" name="pass" placeholder="Type your password"
                  value={password} onChange={e => setPassword(e.target.value)}
                />
                <span className="focus-input100" data-symbol="&#xf190;"></span>
              </label>
            </div>
            <div className="mt-5 ml-3">
              <label className="">
                <input className="mr-2 leading-tight" type="checkbox" value={rememberMe} onChange={(e) => { setRememberMe(e.target.checked) }} />
                <span className="label-input100">
                  Remember me
                </span>
              </label>
            </div>
            <div className="text-right p-t-8 p-b-31">
              <a href="/geeenesis/">
                Forgot password?
            </a>
            </div>
          </form>
          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn"></div>
              <button className="login100-form-btn" onClick={() => { handleLogin() }}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}