import React, { useState, useEffect } from 'react';
import { getMyProfile } from '../api';
import { Divider, Spin } from 'antd';

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

  return (
    <div className="max-w-full">
      {
        Object.keys(myProfile).length !== 0 ?
          <div className="flex flex-col items-center">
            <div className="w-full">

              <h2>Favourite Events</h2>

              {
                myProfile['myProfile']['favouriteEvents'].length > 0 ?
                  <>

                    <p className="break-words">{JSON.stringify(myProfile['myProfile']['favouriteEvents'])}</p>

                  </>
                  : <><span>There is no favourite event</span></>
              }
              <Divider />

              <h2>Interested Events</h2>

              {
                myProfile['myProfile']['interestedEvents'].length > 0 ?
                  <>

                    <p className="break-words">{JSON.stringify(myProfile['myProfile']['interestedEvents'])}</p>

                  </>
                  : <><span>There is no interested event</span></>
              }
              <Divider />

              <h2>Participated Events</h2>

              {
                myProfile['myProfile']['participatedEvents'].length > 0 ?
                  <>

                    <p className="break-words">{JSON.stringify(myProfile['myProfile']['participatedEvents'])}</p>

                  </>
                  : <><span>There is no participated event</span></>
              }
              <Divider />
            </div>

          </div>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }

    </div>
  )
}