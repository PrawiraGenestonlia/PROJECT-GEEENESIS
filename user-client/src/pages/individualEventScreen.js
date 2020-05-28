import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/topNavBar';
import { getSpecificEvent } from '../api';
import { Spin } from 'antd';

export default (props) => {
  const eventName = props.match.params.event_name || '';
  const eventId = props.match.params.event_id || '';
  const [eventInfo, setEventInfo] = useState({});

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
      <TopNavBar title={eventName} back="Home" />
      {
        Object.keys(eventInfo).length ?
          <>
            <p>{"//TODO PROPER CLUB PAGE"}</p>
            <p className="break-words">{JSON.stringify(eventInfo)}</p>
          </>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
    </div>
  )
}