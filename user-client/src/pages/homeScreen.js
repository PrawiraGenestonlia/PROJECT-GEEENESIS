import React, { useState, useEffect } from 'react';
import { getMyProfile, getEventsFromToday, getClubInfo } from '../api';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import { SINGLE_CLUB_URL, SINGLE_EVENT_URL } from '../router/constants.router';
import NTUEEE from '../assets/logo/NTUEEE_GEEENESIS.png';
import HorizontalCardScroll from '../components/horizontalCardScroll';
import BottomDiv from '../components/bottomDiv';
import TopDiv from '../components/topCover';
import { THEME_COLOR } from '../enum';
import { useLocation } from "react-router-dom";

export default () => {
  const [myProfile, setMyProfile] = useState({});
  const [listOfEvents, setListOfEvents] = useState([]);
  const [clubList, setClubList] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    getEvents();
    getClubList();
    getProfileInfo();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
      <TopDiv style={{ backgroundColor: THEME_COLOR.HOME_TAB_COVER.BACKGROUND, backgroundImage: THEME_COLOR.HOME_TAB_COVER.BACKGROUND_GRADIENT }} />
      {
        Object.keys(myProfile).length !== 0 ?
          <div className="flex flex-col z-20">
            {/* <div>Home Header with LOGO</div> */}
            <div className="flex flex-row items-center justify-start">
              <img className="h-32 w-32 border-2 border-solid rounded-full z-20" src={NTUEEE} alt="ntueee" />
              <div className="ml-4 flex flex-col items-start justify-start z-20">
                <div className="z-20">Welcome back, </div>
                <div className="text-bold text-2xl capitalize z-20">{myProfile['myInfo']['name']}!</div>
              </div>
            </div>
            <HorizontalCardScroll className="mt-4" title="Student Bodies">
              {clubList.map((club, index) => {
                return (
                  <div className="item w-64" key={index}>
                    <Link to={SINGLE_CLUB_URL + "/" + club.server_unique_name + "/" + club.title}>
                      <div className="relative w-full h-full overflow-hidden rounded-lg md:rounded-t-none md:rounded-l-lg" style={{ minHeight: '10rem' }}>
                        <img className="absolute inset-0 w-full h-full object-cover object-center" src={club.bannerImgLink} alt="" />
                        <div className="absolute inset-0 w-full h-full bg-black" style={{ opacity: '0.10' }}></div>
                      </div>
                      <div className="inset-0 w-full h-full flex fill-current font-bold items-center text-center mt-2">
                        <span className="w-full" style={{ color: THEME_COLOR['FONT'] }}>{club.title}</span>
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
                      <div className="inset-0 w-full h-full flex fill-current font-bold items-center text-center mt-2">
                        <span className="truncate w-full" style={{ color: THEME_COLOR['FONT'] }}>{event.title}</span>
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