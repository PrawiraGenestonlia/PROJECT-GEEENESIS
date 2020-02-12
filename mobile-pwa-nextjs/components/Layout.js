import { useEffect } from 'react';
import { NavBar, WingBlank } from 'antd-mobile';
import { withRouter } from 'next/router';
import Head from 'next/head';
import isAuth from '../utils/isAuth';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const mainRoute = ['/', '/clubs', '/chats', '/calendar', '/settings'];

const checkMainRoute = (href) => {
  for (const route of mainRoute) {
    if (route == href)
      return 1;
  }
  return 0;
}

function Layout({ router, children, title }) {
  useEffect(() => {
    if (!isAuth()) {
      router.push(`${publicRuntimeConfig.getConfig}/login`);
    }
  }, []);
  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <Head>
        <title>{title}</title>
      </Head>
      <div style={{ position: 'fixed', width: '100%', zIndex: 100, }}>
        {checkMainRoute(router.pathname) ?
          <NavBar
            mode="light"
          >
            {title}
          </NavBar> :
          <NavBar
            mode="light"
            icon={<div>back</div>}
            onLeftClick={() => router.back()}
          >
            {title}
          </NavBar>
        }
      </div>

      <div style={{ padding: '15px', marginTop: '45px', overflow: 'auto', height: '85vh' }}>{children}</div>
    </div>
  )
}
export default withRouter(Layout);
