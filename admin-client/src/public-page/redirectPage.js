import React, { useState, useEffect } from 'react';
import { ADMIN_DASHBOARD_URL, STUDENT_HOME_URL } from '../constants';
import { Redirect } from 'react-router-dom';
import { GetRole } from '../api';

export default () => {
  const [role, setRole] = useState('');

  useEffect(() => {
    GetRole().then((res) => { setRole(res.data) });
  }, []);

  const RedirectedPage = () => {
    if (role === 'superadmin' || role === 'clubadmin') return <Redirect to={ADMIN_DASHBOARD_URL} />
    if (role === 'student' || role === 'mentor') return window.location = STUDENT_HOME_URL;
  }

  return (
    <div>
      {role ? <RedirectedPage /> : null}
    </div>
  )
}