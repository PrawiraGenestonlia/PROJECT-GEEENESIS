import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { LoginToServer } from '../../api';

function validateEmail(email) {
  var re = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(ntu.edu)\.sg$/;
  return re.test(String(email).toLowerCase());
  // return email;
}

function Login() {
  const [inputEmailAddress, setInputEmailAddress] = useState('');
  const [isNTUEmail, setIsNTUEmail] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const handleEmailAddressInput = (input) => {
    setInputEmailAddress(input);
    setIsNTUEmail(validateEmail(input));
  }
  const handleLogin = async () => {
    LoginToServer(inputEmailAddress, inputPassword).then(res => {
      localStorage.setItem('auth-token', res.data);
      window.location.reload();
    }).catch(async err => {
      let message = err ? (err.data ? err.data : err) : err;
      await Swal.fire('Failed to login!', message, 'error');
    })
  }
  return (
    <div className="flex flex-col items-center w-full h-screen mt-40">
      <div className="text-2xl text-blue-600 mb-16">
        <font>Login to access geeenesis admin page</font>
      </div>
      <form className="w-full max-w-sm" autoComplete="on">
        <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text" placeholder="NTU Email Address" aria-label="NTU Email Address"
            value={inputEmailAddress} onChange={(e) => handleEmailAddressInput(e.target.value)} autoComplete="on" />
          <button className="flex-shrink-0 border-transparent border-4 text-blue-500 hover:text-blue-800 text-sm py-1 px-2 rounded"
            type="button" onClick={() => { setInputEmailAddress(''); setIsNTUEmail(false); setInputPassword('') }}>
            Cancel
        </button>
        </div>
        {isNTUEmail ?
          <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password" placeholder="password" aria-label="password"
              value={inputPassword} onChange={e => setInputPassword(e.target.value)} />
            <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button" onClick={() => handleLogin()}>
              Login
        </button>
          </div>
          : null}
      </form>
    </div>
  )
}

export default Login