import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router';
import * as serviceWorker from './serviceWorker';
import SessionControl from './components/sessionControl';

SessionControl();

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
