import Layout from '../components/Layout'
import { Button } from 'antd-mobile'
import logIn from '../utils/logIn';
import router from 'next/router';

function LoginPage() {

  return (
    <>
      <div style={{ backgroundColor: '#add8e6', height: '100%' }}>
        <h1>Login Page</h1>
        <Button onClick={() => { logIn(); router.push('/'); }}>Login</Button>
      </div>
    </>
  )
}

export default LoginPage;