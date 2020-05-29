import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './router';
// import checkScroll from './utils/checkScroll';
import './index.css';
import './css/tailwind.css';
import 'antd/dist/antd.css';

import * as serviceWorker from './serviceWorker';

// import SessionControl from './components/sessionControl';
// SessionControl();

const loader = document.querySelector('.loader');
const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

// const navbarSmall = new checkScroll("navbar", "50px");
// const navbarLarge = new checkScroll("navbarlg", "50px");

const ReactApp = ({ hideLoader }) => {
  useEffect(() => hideLoader(), [hideLoader]);
  // const handleScroll = () => {
  //   checkScroll("navbar", "navbarlg", '50px')
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, true);
  //   return function cleanup() {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <App />;
}

ReactDOM.render(
  <ReactApp
    hideLoader={hideLoader}
    showLoader={showLoader}
  />,
  document.getElementById('root')
);

serviceWorker.register();