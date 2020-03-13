import React, { useState, useEffect } from 'react';
import { getMyProfile, changeAvatar } from '../api';
import DefaultAvatar from '../assets/svg/User.svg';
import Avatar from '../components/avatar';
import { message, Divider } from 'antd';

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
    getProfileInfo();
  }, []);

  const getProfileInfo = () => {
    getMyProfile().then(res => {
      if (res.status === 200) setMyProfile(res.data)
    }).catch(e => { })
  }


  const uploadAvatar = (file) => {
    changeAvatar(file).then(async (msg) => {
      if (msg.status === 200) {
        let messages = msg ? (msg.data ? msg.data : JSON.stringify(msg)) : JSON.stringify(msg);
        message.success(messages, 5);
        getProfileInfo();
      }
    }).catch(async (err) => {
      let messages = err ? (err.data ? err.data : JSON.stringify(err)) : JSON.stringify(err);
      message.error(messages, 5);
    });
  }

  return (
    <div className="max-w-full">
      {
        Object.keys(myProfile).length !== 0 ?
          <div className="flex flex-col items-center">
            <label htmlFor="avatar-image-file">
              <Avatar src={myProfile['myInfo']['avatarUrl']} />
              <input className="hidden"
                id="avatar-image-file" capture="camera" type="file" accept="image/*" placeholder="image" value={''} onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    if (file.size < 1024 * 512) uploadAvatar(file);
                    else message.error("File size must be less than 500 KB. You may compress your image at https://tinyjpg.com.", 5);
                  }
                }} />
            </label>
            <div className="mt-2"><text>{getGreetings()}, {myProfile['myInfo']['name']}!</text></div>
            <Divider dashed />
            <div className="w-full">
              <p className="break-words">{JSON.stringify(myProfile)}</p>
            </div>
          </div>
          : null
      }

    </div>
  )
}