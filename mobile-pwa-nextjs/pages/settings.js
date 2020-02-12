import Layout from '../components/Layout'
import { Button } from 'antd-mobile'
import logOut from '../utils/logOut';
import router from 'next/router';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default () => (
  <Layout title="Settings">
    <span>Settings</span>
    <Button onClick={() => { logOut(); router.push(`${publicRuntimeConfig.basePath}/login`); }}>Log Out</Button>
  </Layout>
)
