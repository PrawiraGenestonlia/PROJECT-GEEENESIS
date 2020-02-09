import React from 'react';
import App from 'next/app';
import TabBar from '../components/TabBar';
import router from 'next/router';
export default class CustomApp extends App {

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <Component {...pageProps} />
        {
          router.pathname != '/login' ?
            <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
              <TabBar />
            </div>
            : <></>
        }
      </>
    )
  }
}
