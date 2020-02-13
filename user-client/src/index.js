import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import './index.css';
import './css/tailwind.css';
import 'antd/dist/antd.css';

import * as serviceWorker from './serviceWorker';

// import SessionControl from './components/sessionControl';
// SessionControl();

const loader = document.querySelector('.loader');
const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');
const ReactApp = ({ hideLoader }) => {
  useEffect(() => hideLoader(), [hideLoader]);
  return <App />;
}

ReactDOM.render(
  <ReactApp
    hideLoader={hideLoader}
    showLoader={showLoader}
  />,
  document.getElementById('root')
);

serviceWorker.unregister();