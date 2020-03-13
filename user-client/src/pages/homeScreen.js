import React, { useState, useEffect } from 'react';
import { getMyProfile } from '../api';
import DefaultAvatar from '../assets/svg/User.svg';

const getGreetings = () => {
  var today = new Date()
  var curHr = today.getHours()
  if (curHr < 6) {
    return "Time to sleep";
  } else if (curHr < 12) {
    return "Good morning";
  } else if (curHr < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

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
      {
        Object.keys(myProfile).length !== 0 ?
          <div className="flex flex-col items-center">
            <img className="h-24 w-24" alt="avatar" src={myProfile['myInfo']['avatarUrl'] ? myProfile['myInfo']['avatarUrl'] : DefaultAvatar} />
            <div><text>{getGreetings()}, {myProfile['myInfo']['name']}!</text></div>
          </div>
          : null
      }
      <p className="break-words">{JSON.stringify(myProfile)}</p>
    </div>
  )
}