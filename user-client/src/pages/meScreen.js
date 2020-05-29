import React, { useState, useEffect } from 'react';
import { getMyProfile, changeAvatar } from '../api';
import Avatar from '../components/avatar';
import { message, Divider, Spin, Button, Tabs, Progress } from 'antd';
import { ABOUT_URL } from '../router/constants.router';
import BannerImg from '../assets/img/banner.jpg';
import LogOut from '../utils/logOut';
import BottomDiv from '../components/bottomDiv';
import { Link, useHistory } from "react-router-dom";
import '../css/tabs.css';

const { TabPane } = Tabs;

export default () => {
  const history = useHistory();
  const [myProfile, setMyProfile] = useState({});

  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = () => {
    getMyProfile().then(res => {
      if (res.status === 200) setMyProfile(res.data)
    }).catch(e => { });

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

  const onClickAbout = () => {
    history.push(ABOUT_URL);
  }

  return (
    <div className="max-w-full w-full ">
      <img className="object-cover z-10 h-40 w-full rounded-t-md" alt="banner" src={BannerImg} style={{ marginBottom: '-3rem', }} />
      {
        Object.keys(myProfile).length !== 0 ?
          <div className="flex flex-col w-full bg-white rounded-md p-2 z-20">
            <div className="flex flex-row ml-6">
              <label htmlFor="avatar-image-file">
                <Avatar className="h-32 w-32" src={myProfile['myInfo']['avatarUrl']} bEdit={true} />
              </label>
              <div className="flex ml-2 text-xl " style={{ marginTop: '3rem' }}>
                <strong className="break-words capitalize">{myProfile['myInfo']['name']}</strong>
              </div>
            </div>
            <div className="flex flex-row mt-5">
              <Button block onClick={LogOut}>⚙ Settings</Button>
              <div className='mx-1'></div>
              <Button block onClick={onClickAbout}>ℹ About</Button>
            </div>
            <div className="me-screen w-full mt-3">
              <Tabs onChange={() => { }}>
                <TabPane tab="Statistics" key="1">
                  {'//TODO :: Still in Ideation'}
                  <BottomDiv />
                </TabPane>
                <TabPane tab="Event Manager" key="2">
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
                </TabPane>
              </Tabs>
            </div>

            {/* <Divider /> */}
            <Button block onClick={LogOut}>Log Out</Button>
          </div>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
      <input className="hidden"
        id="avatar-image-file" type="file" accept="image/*" placeholder="image" value={''} onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            if (file.size < 1024 * 512) uploadAvatar(file);
            else message.error("File size must be less than 500 KB. You may compress your image at https://tinyjpg.com.", 5);
          }
        }} />
      <BottomDiv />
    </div >
  )
}