import React, { useState, useEffect } from 'react';
import { getMyProfile } from '../api';
import { Divider, Spin, Tabs } from 'antd';

const { TabPane } = Tabs;
const ROLE = {
  MENTOR: 1,
  STUDENT: 2,
  SB: 3,
  JB: 4
}

export default () => {
  const [myProfile, setMyProfile] = useState({});
  const [isTabLayout, setIsTabLayout] = useState(true);

  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = () => {
    getMyProfile().then(res => {
      if (res.status === 200) setMyProfile(res.data)
    }).catch(e => { })
  }

  const profileList = (profiles, role) => { //array
    return (
      <>
        <p>{`<Proper List for ${role}/> //TODO`}</p>
        <p className="break-words">{JSON.stringify(profiles)}</p>
      </>
    )
  }

  return (
    <div className="max-w-full">
      {
        Object.keys(myProfile).length !== 0 ?
          <div className="flex flex-col items-center">
            <div className="w-full">
              {
                isTabLayout ?
                  <Tabs onChange={() => { }}>
                    {
                      myProfile['myMentor'].length > 0 ?
                        <TabPane tab={<h2>My Mentor</h2>} key="1">
                          {profileList(myProfile['myMentor'], ROLE.MENTOR)}
                        </TabPane>
                        : null
                    }
                    {
                      myProfile['myStudent'].length > 0 ?
                        <TabPane tab={<h2>My Student</h2>} key="2">
                          {profileList(myProfile['myStudent'], ROLE.STUDENT)}
                        </TabPane>
                        : null
                    }
                    {
                      myProfile['mySeniorBuddy'].length > 0 ?
                        <TabPane tab={<h2>My Senior Buddy</h2>} key="3">
                          {profileList(myProfile['mySeniorBuddy'], ROLE.SB)}
                        </TabPane>
                        : null
                    }
                    {
                      myProfile['myJuniorBuddy'].length > 0 ?
                        <TabPane tab={<h2>My Junior Buddy</h2>} key="4">
                          {profileList(myProfile['myJuniorBuddy'], ROLE.JB)}
                        </TabPane>
                        : null
                    }

                  </Tabs>
                  :
                  <>
                    {
                      myProfile['myMentor'].length > 0 ?
                        <>
                          <p>
                            <h2>My Mentor</h2>
                          </p>
                          {profileList(myProfile['myMentor'], ROLE.MENTOR)}
                          <Divider />
                        </>
                        : null
                    }
                    {
                      myProfile['myStudent'].length > 0 ?
                        <>
                          <p>
                            <h2>My Student</h2>
                          </p>
                          {profileList(myProfile['myStudent'], ROLE.STUDENT)}
                          <Divider />
                        </>
                        : null
                    }
                    {
                      myProfile['mySeniorBuddy'].length > 0 ?
                        <>
                          <p>
                            <h2>My Senior Buddy</h2>
                          </p>
                          {profileList(myProfile['mySeniorBuddy'], ROLE.SB)}
                          <Divider />
                        </>
                        : null
                    }
                    {
                      myProfile['myJuniorBuddy'].length > 0 ?
                        <>
                          <p>
                            <h2>My Junior Buddy</h2>
                          </p>
                          {profileList(myProfile['myJuniorBuddy'], ROLE.JB)}
                          <Divider />
                        </>
                        : null
                    }
                  </>
              }
              <div onClick={() => { setIsTabLayout((state) => !state) }}>

              </div>

              {/* <p className="break-words">{JSON.stringify(myProfile)}</p> */}
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