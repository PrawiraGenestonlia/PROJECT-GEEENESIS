import React, { useState, useEffect } from 'react';
import { getMyProfile, changeAvatar } from '../api';
import Avatar from '../components/avatar';
import { message, Divider, Spin, Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { ABOUT_URL } from '../router/constants.router';
import BannerImg from '../assets/img/banner.jpg';
import LogOut from '../utils/logOut';
import BottomDiv from '../components/bottomDiv';

const { TabPane } = Tabs;

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

  return (
    <div className="max-w-full w-full ">
      {console.log(myProfile)}
      <img className="object-cover z-10 h-40 w-full rounded-t-md" alt="banner" src={BannerImg} style={{ marginBottom: '-3rem', }} />
      {
        Object.keys(myProfile).length !== 0 ?
          <div className="flex flex-col  bg-white rounded-md p-2 z-20">
            <div className="flex flex-row ml-6">
              <label htmlFor="avatar-image-file">
                <Avatar className="h-32 w-32" src={myProfile['myInfo']['avatarUrl']} bEdit={true} />
              </label>
              <div className="flex ml-2 text-xl " style={{ marginTop: '3rem' }}>
                <strong className="break-words">{myProfile['myInfo']['name']}</strong>
              </div>

            </div>

            <div className="w-full mt-3">
              <Tabs onChange={() => { }}
                renderTabBar={(props, DefaultTabBar) => {
                  console.log('props - ', props, props.activeKey)
                  return (
                    <DefaultTabBar {...props} defaultActiveKey='0' />
                  );
                }}
                type="card">
                <TabPane tab="Tab 111111" key="1">
                  Content of Tab Pane 1
              </TabPane>
                <TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
              </TabPane>
                <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
              </TabPane>
              </Tabs>
            </div>

            <Divider />
            <div className="flex flex-col items-start w-full">
              <div>
                <h2>Upcoming Events</h2>
                <p>{`<Events Carousel/> //TODO`}</p>
              </div>
              <Divider />
              <div>
                <h2>Statistics</h2>
                <p>{`<Number of Events Participated/> //TODO`}</p>
              </div>
              <Divider />
              <div>
                <Link to={ABOUT_URL}>
                  <h2>About</h2>
                  <p style={{ color: 'black' }}>{`Click here to learn more about this app`}</p>
                </Link>
              </div>
            </div>

            <Divider />
            <Button block onClick={LogOut}>Log Out</Button>
            <div className="w-full">
              {/* <p className="break-words">{JSON.stringify(myProfile)}</p> */}
            </div>
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