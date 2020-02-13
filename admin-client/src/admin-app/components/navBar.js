import React, { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';
import GetToken from './getToken';
import {
  ADMIN_DASHBOARD_URL,
  ADMIN_USERMANAGEMENT_URL,
  ADMIN_EVENTMANAGEMENT_URL,
  ADMIN_MENTORING_URL,
  ADMIN_SENIORBUDDY_URL,
  ADMIN_INFORMATION_URL,
  CALENDAR_OF_EVENTS,
  ADMIN_PROFILE_URL,
  STUDENT_HOME_URL
} from '../../constants';
import { GetRole } from '../../api';
import ChangePassword from '../../components/changePassword';
import { useStateValue } from '../../context';


function handleLogOut() {
  localStorage.removeItem('auth-token');
  window.location.reload();
}

const NavItem = (props) => {
  const [isNavHidden, dispatch] = useStateValue();
  return (
    <div>
      <div className="flex justify-center pt-2 pb-2 text-white text-lg" onClick={() => {
        if (isNavHidden !== "others") {
          dispatch({
            type: 'clickNav',
            isNavHidden: true
          })
        }
      }}>
        {
          props.a ?
            <a href={props.a}>
              <span>{props.label}</span>
            </a>
            :
            <Link to={props.to}>
              <span>{props.label}</span>
            </Link>
        }
      </div>
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
          <NavItem label="Senior Buddy" to={ADMIN_SENIORBUDDY_URL} />
          <NavItem label="Club Information" to={ADMIN_INFORMATION_URL} />
          <NavItem label="Event Management" to={ADMIN_EVENTMANAGEMENT_URL} />
          <NavItem label="Calendar Of Events" to={CALENDAR_OF_EVENTS} />
          <NavItem label="Profile" to={ADMIN_PROFILE_URL} />
          {/* <NavItem label="Go to user mode" to={STUDENT_EXTENDED_URL} ></NavItem> */}
          <NavItem label="Go to user mode" a={STUDENT_HOME_URL} />
        </React.Fragment>
      )
    }
    if (role === 'clubadmin') {
      return (
        <React.Fragment>
          <NavItem label="Home" to={ADMIN_DASHBOARD_URL} />
          <NavItem label="Club Information" to={ADMIN_INFORMATION_URL} />
          <NavItem label="Event Management" to={ADMIN_EVENTMANAGEMENT_URL} />
          <NavItem label="Calendar Of Events" to={CALENDAR_OF_EVENTS} />
          <NavItem label="Go to user mode" to={STUDENT_HOME_URL} />
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <NavItem label="Home" to={ADMIN_DASHBOARD_URL} />
          <NavItem label="Club Information" to={ADMIN_INFORMATION_URL} />
          <NavItem label="Calendar Of Events" to={CALENDAR_OF_EVENTS} />
          <NavItem label="Profile" to={ADMIN_PROFILE_URL} />
          <NavItem label="Go to user mode" to={STUDENT_HOME_URL} />
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
      {/* <a className="skip-link" /> */}

      <div className="">
        <NavList />
      </div>
      <div className="flex flex-col items-center justify-center">
        {GetToken() ?
          <React.Fragment>
            <ChangePassword buttonClassName="bg-transparent border-transparent hover:bg-gray-100 text-gray-800 font-semibold p-1 border rounded shadow" />
            <button className="btn bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-10"
              onClick={() => { handleLogOut() }}>
              Log Out
            </button>
          </React.Fragment>
          : null}
      </div>

    </nav>
  )
}