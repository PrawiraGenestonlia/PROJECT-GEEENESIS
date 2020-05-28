import React, { useState, useEffect } from 'react';
import { getMyProfile, getMentorProfile } from '../api';
import { Divider, Spin, Tabs, Input, message } from 'antd';
import BottomDiv from '../components/bottomDiv';

const { TabPane } = Tabs;
const { Search } = Input;

const ROLE = {
  MENTOR: 1,
  STUDENT: 2,
  SB: 3,
  JB: 4
}

export default () => {
  const [myProfile, setMyProfile] = useState({});
  const [searchData, setSearchData] = useState({});
  const [loadingState, setLoadingState] = useState(false);
  const [isTabLayout, setIsTabLayout] = useState(true);

  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = () => {
    getMyProfile().then(res => {
      if (res.status === 200) setMyProfile(res.data)
    }).catch(e => { })
  }

  const onSearch = (value) => {
    setLoadingState(true);
    const networkName = value.lastIndexOf("@") >= 0 ? value.substring(0, value.lastIndexOf("@")) : value;
    getMentorProfile(networkName).then((msg) => {
      let messages = msg ? (msg.data ? msg.data : JSON.stringify(msg)) : JSON.stringify(msg);
      Object.keys(msg).length > 2 ? setSearchData(msg) : setSearchData(messages);
      setLoadingState(false);
    }).catch(async (err) => {
      let messages = err ? (err.data ? err.data : JSON.stringify(err)) : JSON.stringify(err);
      message.error(messages, 5);
      setLoadingState(false);
    });
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
    <div>
      <div className="flex items-center justify-center w-full">
        <Search
          className="rounded-lg"
          placeholder="network name / email"
          onSearch={value => value ? onSearch(value) : null}
          style={{ width: '100%' }}
          loading={loadingState}
        />
      </div>
      <div className="mt-3 mb-3" style={{ height: '1px', backgroundColor: '#bdc0c7' }} />
      {
        Object.keys(myProfile).length !== 0 ?
          <div className="flex flex-col items-center">
            <div className="w-full bg-white p-2 rounded-md">
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
            <BottomDiv />
          </div>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }

    </div>
  )
}