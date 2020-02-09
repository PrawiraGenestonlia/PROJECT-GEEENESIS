import Layout from '../components/Layout'
import { Button } from 'antd-mobile'
import logOut from '../utils/logOut';
import router from 'next/router';

export default () => (
  <Layout title="Settings">
    <span>Settings</span>
    <Button onClick={() => { logOut(); router.push('/login'); }}>Log Out</Button>
  </Layout>
)
