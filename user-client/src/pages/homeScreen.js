import React, { useState, useEffect } from 'react';
import { getMyProfile, getEventsFromToday, getClubInfo } from '../api';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import { SINGLE_CLUB_URL, SINGLE_EVENT_URL } from '../router/constants.router';
import HorizontalCardScroll from '../components/horizontalCardScroll';
import BottomDiv from '../components/bottomDiv';

export default () => {
  const [myProfile, setMyProfile] = useState({});
  const [listOfEvents, setListOfEvents] = useState([]);
  const [clubList, setClubList] = useState([]);

  useEffect(() => {
    getEvents();
    getClubList();
    getProfileInfo();
  }, []);

  const getProfileInfo = () => {
    getMyProfile().then(res => {
      if (res.status === 200) setMyProfile(res.data)
    }).catch(e => { })
  }


  const getEvents = () => {
    getEventsFromToday().then(res => {
      if (res.status === 200) setListOfEvents(res.data)
    }).catch(e => { })
  }

  const getClubList = () => {
    getClubInfo().then(res => {
      if (res.status === 200) setClubList(res.data)
    }).catch(e => { })
  }

  return (
    <div className="max-w-full w-full ">
      {
        Object.keys(myProfile).length !== 0 ?
          <div className="flex flex-col items-center">
            <div>Home Header with LOGO</div>
            <div className="mt-2"><span>Welcome back, <strong>{myProfile['myInfo']['name']}</strong>!</span></div>
            <HorizontalCardScroll className="mt-4" title="Student Bodies">
              {clubList.map((club, index) => {
                return (
                  <div className="item w-64" key={index}>
                    <Link to={SINGLE_CLUB_URL + "/" + club.server_unique_name + "/" + club.title}>
                      <div className="relative w-full h-full overflow-hidden rounded-lg md:rounded-t-none md:rounded-l-lg" style={{ minHeight: '10rem' }}>
                        <img className="absolute inset-0 w-full h-full object-cover object-center" src={club.bannerImgLink} alt="" />
                        <div className="absolute inset-0 w-full h-full bg-black" style={{ opacity: '0.20' }}></div>
                      </div>
                      <div className="inset-0 w-full h-full flex fill-current text-black font-bold items-center text-center mt-2">
                        <span className="w-full">{club.title}</span>
                      </div>
                    </Link>
                  </div>
                )
              })
              }

            </HorizontalCardScroll>
            <HorizontalCardScroll className="mt-4" title="Upcoming Events">
              {listOfEvents.map((event, index) => {
                return (
                  <div className="item w-64" key={index}>
                    <Link to={SINGLE_EVENT_URL + "/Home/" + event.uniqueName + "/" + event.title}>
                      <div className="relative w-full h-full overflow-hidden rounded-lg md:rounded-t-none md:rounded-l-lg" style={{ minHeight: '10rem' }}>
                        <img className="absolute inset-0 w-full h-full object-cover object-center" src={event.imageUrl || `https://picsum.photos/seed/${event._id}/400/400`} alt={event.title} />
                        <div className="absolute inset-0 w-full h-full bg-black" style={{ opacity: '0.20' }}></div>
                      </div>
                      <div className="inset-0 w-full h-full flex fill-current text-black font-bold items-center text-center mt-2">
                        <span className="w-full">{event.title}</span>
                      </div>
                    </Link>
                  </div>
                )
              })
              }
            </HorizontalCardScroll>
            <BottomDiv />
          </div>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }

    </div >
  )
}