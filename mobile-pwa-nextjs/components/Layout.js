import { NavBar, WingBlank } from 'antd-mobile';
import { withRouter } from 'next/router';
import Head from 'next/head';

const mainRoute = ['/', '/clubs', '/chats', '/calendar', '/settings'];

const checkMainRoute = (href) => {
  for (const route of mainRoute) {
    if (route == href)
      return 1;
  }
  return 0;
}

function Layout({ router, children, title }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Head>
        <title>{title}</title>
      </Head>
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
      <div style={{ padding: '15px' }}>{children}</div>
    </div>
  )
}
export default withRouter(Layout);
