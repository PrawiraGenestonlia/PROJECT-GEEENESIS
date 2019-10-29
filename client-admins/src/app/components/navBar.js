import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';
import GetToken from './getToken';
import {
  ADMIN_DASHBOARD_URL,
  ADMIN_USERMANAGEMENT_URL,
  ADMIN_MENTORING_URL,
  ADMIN_INFORMATION_URL,
  ADMIN_EVENTS_URL,
  ADMIN_PROFILE_URL
} from '../../constants';
import { GetRole } from '../api';



function handleLogOut() {
  localStorage.removeItem('auth-token');
  window.location.reload();
}

const NavItem = (props) => {
  return (
    <div className="flex justify-center pt-2 pb-2 text-white text-lg">
      <Link to={props.to}>
        <span>{props.label}</span>
      </Link>
    </div>
  )
}

export default () => {
  const [role, setRole] = useState('student');

  useEffect(() => {
    GetRole().then((res) => { setRole(res.data) });
  }, []);

  const NavList = () => {
    if (role === 'superadmin') {
      return (
        <React.Fragment>
          <NavItem label="Home" to={ADMIN_DASHBOARD_URL} />
          <NavItem label="User Management" to={ADMIN_USERMANAGEMENT_URL} />
          <NavItem label="Mentoring" to={ADMIN_MENTORING_URL} />
          <NavItem label="Information" to={ADMIN_INFORMATION_URL} />
          <NavItem label="Events" to={ADMIN_EVENTS_URL} />
          <NavItem label="Profile" to={ADMIN_PROFILE_URL} />
        </React.Fragment>
      )
    }
    if (role === 'clubadmin') {
      return (
        <React.Fragment>
          <NavItem label="Home" to={ADMIN_DASHBOARD_URL} />
          <NavItem label="Information" to={ADMIN_INFORMATION_URL} />
          <NavItem label="Events" to={ADMIN_EVENTS_URL} />
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <NavItem label="Home" to={ADMIN_DASHBOARD_URL} />
          <NavItem label="Information" to={ADMIN_INFORMATION_URL} />
          <NavItem label="Events" to={ADMIN_EVENTS_URL} />
          <NavItem label="Profile" to={ADMIN_PROFILE_URL} />
        </React.Fragment>
      )
    }
  }

  return (
    <nav className="h-screen nav p-4">
      <div className="text-center">
        <Link to="/">
          <div className="flex h-16 text-2xl items-center justify-center">
            <span className="text-white">Admin Logo</span>
          </div>
        </Link>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="mt-4" />
      <div>
        <NavList />
      </div>
      <div className="flex items-center justify-center">
        {GetToken() ?
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-10"
            onClick={() => { handleLogOut() }}>
            Log Out
        </button> : null}
      </div>

    </nav>
  )

}