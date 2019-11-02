import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
// import { LoginToServer } from '../api';
import './css/main.css';
import './css/util.css';

function validateEmail(email) {
  var re = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ntu.edu)\.sg$/;
  return re.test(String(email).toLowerCase());
  // return email;
}


export default () => {
  const [email, setEmail] = useState('');
  const [isNTUEmail, setIsNTUEmail] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {

  }, [email]);

  return (
    <div className="flex h-screen w-screen">
      <div className="container-login100" style={{ backgroundImage: 'url(' + require('./bg-01.jpg') + ')' }}>
        <div className="wrap-login100 p-16">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-49">
              Login
          </span>
            <div className="wrap-input100 validate-input m-b-23">
              <span className="label-input100">NTU Email Address</span>
              <input className="input100" type="text" name="email" placeholder="Type your email" />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <span className="label-input100">Password</span>
              <input className="input100" type="password" name="pass" placeholder="Type your password" />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            <div className="text-right p-t-8 p-b-31">
              <a href="#">
                Forgot password?
            </a>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">
                  Login
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}