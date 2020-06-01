import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/topNavBar';
import { getSpecificEvent } from '../api';
import { Spin } from 'antd';
import BottomDiv from '../components/bottomDiv';
import { useLocation } from 'react-router-dom';

export default (props) => {
  const eventName = props.match.params.event_name || '';
  const eventId = props.match.params.event_id || '';
  const fromPage = props.match.params.from_page || '';
  const [eventInfo, setEventInfo] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    getEventInfo(eventId)
  }, [eventId]);

  const getEventInfo = (eventId) => {
    getSpecificEvent(eventId).then(res => {
      if (res.status === 200) setEventInfo(res.data)
    }).catch(e => { })
  }

  return (
    <div>
      <TopNavBar title={eventName} back={fromPage} />
      {
        Object.keys(eventInfo).length ?
          <>
            <p>{"//TODO PROPER CLUB PAGE"}</p>
            <p className="break-words">{JSON.stringify(eventInfo)}</p>
            <BottomDiv />
          </>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
    </div>
  )
}