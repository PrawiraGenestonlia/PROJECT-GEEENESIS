import React, { useState, useEffect } from 'react';
import { getEventsFromToday } from '../api';

export default () => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    getEventsList()
  }, []);

  const getEventsList = () => {
    getEventsFromToday().then(res => {
      console.log(res.data)
      if (res.status === 200) setEventsList(res.data)
    }).catch(e => { })
  }
  return (
    <div>
      <h1>Home Screen</h1>
      <p className="break-words">{JSON.stringify(eventsList)}</p>
    </div>
  )
}