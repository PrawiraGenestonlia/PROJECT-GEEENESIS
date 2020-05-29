import React, { useState, useEffect } from 'react';
import { getMyProfile, changeAvatar } from '../api';
import Avatar from '../components/avatar';
import { message, Divider, Spin, Button, Tabs, } from 'antd';
import { ABOUT_URL, SINGLE_EVENT_C_URL, SETTINGS_URL } from '../router/constants.router';
import BannerImg from '../assets/img/banner.jpg';
import LogOut from '../utils/logOut';
import BottomDiv from '../components/bottomDiv';
import { Link, useHistory } from "react-router-dom";
import EventCard from '../components/eventCard';
import { EVENT_BUTTON_OPTIONS } from '../enum';
import '../css/tabs.css';

const { TabPane } = Tabs;
let eventActionFav = {};
eventActionFav[EVENT_BUTTON_OPTIONS.DEL_FAV] = true;
eventActionFav[EVENT_BUTTON_OPTIONS.ADD_INT] = true;
eventActionFav[EVENT_BUTTON_OPTIONS.ADD_PART] = true;

let eventActionInterested = {};
eventActionInterested[EVENT_BUTTON_OPTIONS.ADD_FAV] = true;
eventActionInterested[EVENT_BUTTON_OPTIONS.DEL_INT] = true;
eventActionInterested[EVENT_BUTTON_OPTIONS.ADD_PART] = true;

let eventActionParticipated = {};
eventActionParticipated[EVENT_BUTTON_OPTIONS.ADD_FAV] = true;
eventActionParticipated[EVENT_BUTTON_OPTIONS.ADD_INT] = true;
eventActionParticipated[EVENT_BUTTON_OPTIONS.DEL_PART] = true;

export default () => {
  const history = useHistory();
  const [myProfile, setMyProfile] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getProfileInfo();
  }, [refresh]);

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

  const onClickSettings = () => {
    history.push(SETTINGS_URL);
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
              <Button block onClick={onClickSettings}>⚙ Settings</Button>
              <div className='mx-1'></div>
              <Button block onClick={onClickAbout}>ℹ About</Button>
            </div>
            <div className="me-screen w-full mt-3">
              <Tabs onChange={() => { }}>
                <TabPane tab="Event Manager" key="1">
                  {
                    Object.keys(myProfile).length !== 0 ?
                      <div className="flex flex-col items-center">
                        <div className="w-full">

                          <h2>Favourite Events</h2>

                          {
                            myProfile['myProfile']['favouriteEvents'].length > 0 ?
                              <>
                                {
                                  myProfile['myProfile']['favouriteEvents'].map((event, index) => {
                                    return (
                                      <div className="truncate" key={index}>
                                        <Link to={SINGLE_EVENT_C_URL + "/Calendar/" + event.uniqueName + "/" + event.title}>
                                          <EventCard event={event} options={true} action={eventActionFav} refresh={() => { setRefresh(!refresh) }} />
                                        </Link>
                                      </div>
                                    )
                                  })
                                }
                              </>
                              : <><span>There is no favourite event</span></>
                          }
                          <Divider />

                          <h2>Interested Events</h2>

                          {
                            myProfile['myProfile']['interestedEvents'].length > 0 ?
                              <>
                                {
                                  myProfile['myProfile']['interestedEvents'].map((event, index) => {
                                    return (
                                      <div className="truncate" key={index}>
                                        <Link to={SINGLE_EVENT_C_URL + "/Calendar/" + event.uniqueName + "/" + event.title}>
                                          <EventCard event={event} options={true} action={eventActionInterested} refresh={() => { setRefresh(!refresh) }} />
                                        </Link>
                                      </div>
                                    )
                                  })
                                }
                              </>
                              : <><span>There is no interested event</span></>
                          }
                          <Divider />

                          <h2>Participated Events</h2>

                          {
                            myProfile['myProfile']['participatedEvents'].length > 0 ?
                              <>
                                {
                                  myProfile['myProfile']['participatedEvents'].map((event, index) => {
                                    return (
                                      <div className="truncate" key={index}>
                                        <Link to={SINGLE_EVENT_C_URL + "/Calendar/" + event.uniqueName + "/" + event.title}>
                                          <EventCard event={event} options={true} action={eventActionParticipated} refresh={() => { setRefresh(!refresh) }} />
                                        </Link>
                                      </div>
                                    )
                                  })
                                }
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
                <TabPane tab="Statistics" key="2">
                  {'//TODO :: Still in Ideation'}
                  <BottomDiv />
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