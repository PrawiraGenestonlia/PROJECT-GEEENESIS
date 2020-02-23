import React, { useState, useEffect } from 'react';
import { getMyProfile } from '../api';

export default () => {
  const [myProfile, setMyProfile] = useState({});

  useEffect(() => {
    getProfileInfo()
  }, []);

  const getProfileInfo = () => {
    getMyProfile().then(res => {
      if (res.status === 200) setMyProfile(res.data)
    }).catch(e => { })
  }

  return (
    <div className="max-w-full">
      <p className="break-words">{JSON.stringify(myProfile)}</p>
    </div>
  )
}