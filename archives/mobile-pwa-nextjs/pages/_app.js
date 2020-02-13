import React from 'react';
import App from 'next/app';
import TabBar from '../components/TabBar';
import Head from 'next/head';
import router from 'next/router';
import '../css/index.css';
import '../css/tailwind.css';
export default class CustomApp extends App {

  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <Head>
          <title>NTU EEE Mobile App</title>
        </Head>
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
