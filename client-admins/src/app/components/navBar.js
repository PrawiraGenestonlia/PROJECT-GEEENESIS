import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';
import GetToken from './getToken';
import {
  ADMIN_LOGIN_URL,
  ADMIN_DASHBOARD_URL,
  ADMIN_USERMANAGEMENT_URL
} from '../../constants';

function handleLogOut() {
  localStorage.removeItem('auth-token');
  window.location.reload();
}

const NavItem = (props) => {
  return (
    <div class="flex justify-center pt-2 pb-2 text-white text-lg">
      <Link to={props.to}>
        <span>{props.label}</span>
      </Link>
    </div>
  )
}

export default () => {
  return (
    <nav class="h-screen nav p-4">
      <div class="text-center">
        <Link to="/">
          <div class="flex h-16 text-2xl items-center justify-center">
            <span class="text-white">Admin Logo</span>
          </div>
        </Link>
      </div>
      <div class="bg-divider" style={{ height: '0.1rem' }} />
      <div class="mt-4" />
      <div>
        <NavItem label="Home" to={ADMIN_DASHBOARD_URL} />
        <NavItem label="User Management" to={ADMIN_USERMANAGEMENT_URL} />
      </div>
      <div class="flex items-center justify-center">
        {GetToken() ?
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-10"
            onClick={() => { handleLogOut() }}>
            Log Out
        </button> : null}
      </div>

    </nav>
  )

}