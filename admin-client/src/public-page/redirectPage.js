import React, { useState, useEffect } from 'react';
import { LOGIN_URL, ADMIN_DASHBOARD_URL, STUDENT_HOME_URL } from '../constants';
import { Redirect } from 'react-router-dom';
import { GetRole } from '../api';

export default () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    GetRole().then((res) => { setRole(res.data) }).catch((e) => { setRole('others') });
  }, []);

  const RedirectedPage = () => {
    console.log(role)
    if (role === 'superadmin' || role === 'clubadmin') return <Redirect to={ADMIN_DASHBOARD_URL} />
    if (role === 'student' || role === 'mentor') {
      window.location = STUDENT_HOME_URL;
      return <></>;
    }
    else {
      localStorage.removeItem('auth-token');
      return <Redirect to={LOGIN_URL} />
    }
  }

  return (
    <div>
      {role ? <RedirectedPage /> : null}
    </div>
  )
}