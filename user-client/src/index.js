import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import { TYPE_OF_THEME } from './enum';
// import checkScroll from './utils/checkScroll';
import './index.css';
import './css/tailwind.css';
// import 'antd/dist/antd.css';
// import 'antd/dist/antd.dark.css';

import * as serviceWorker from './serviceWorker';

// import SessionControl from './components/sessionControl';
// SessionControl();

const loader = document.querySelector('.loader');
const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');

// const navbarSmall = new checkScroll("navbar", "50px");
// const navbarLarge = new checkScroll("navbarlg", "50px");
const LightTheme = React.lazy(() => import('./themes/lightTheme'));
const DarkTheme = React.lazy(() => import('./themes/darkTheme'));

const ThemeSelector = ({ children }) => {
  const CHOSEN_THEME = localStorage.getItem('TYPE_OF_THEME') || TYPE_OF_THEME.DEFAULT;
  return (
    <>
      <React.Suspense fallback={() => null}>
        {(CHOSEN_THEME === TYPE_OF_THEME.LIGHT_MODE) && <LightTheme />}
        {(CHOSEN_THEME === TYPE_OF_THEME.DARK_MODE) && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  )
}

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

  return <ThemeSelector><App /></ThemeSelector>;
}

ReactDOM.render(
  <ReactApp
    hideLoader={hideLoader}
    showLoader={showLoader}
  />,
  document.getElementById('root')
);

serviceWorker.register();