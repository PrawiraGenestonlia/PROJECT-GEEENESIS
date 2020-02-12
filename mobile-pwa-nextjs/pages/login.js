import Layout from '../components/Layout'
import { Button } from 'antd-mobile'
import logIn from '../utils/logIn';
import router from 'next/router';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function LoginPage() {

  return (
    <>
      <div style={{ backgroundColor: '#add8e6', height: '100%' }}>
        <h1>Login Page</h1>
        <label htmlFor="email" style={{ display: "block" }}>
          Email
            </label>
        <input
          aria-label="email"
          id="email"
          placeholder="Enter your email"
          type="text"
        // value={values.email}
        // onChange={handleChange}
        // onBlur={handleBlur}
        // className={
        //   errors.email && touched.email
        //     ? "text-input error"
        //     : "text-input"
        // }
        />
        <Button onClick={() => { logIn(); router.push(`${publicRuntimeConfig.basePath}/`); }}>Login</Button>
      </div>
    </>
  )
}

export default LoginPage;