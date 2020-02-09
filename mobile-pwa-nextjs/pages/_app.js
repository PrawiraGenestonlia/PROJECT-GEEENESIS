import React from 'react';
import App from 'next/app';
import TabBar from '../components/TabBar';

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <TabBar />
        </div>
      </>
    )
  }
}
