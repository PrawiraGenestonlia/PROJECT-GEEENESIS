import React, { useState, useEffect } from 'react';
import { getClubInfo } from '../api';

export default () => {
  const [clubList, setClubList] = useState([]);

  useEffect(() => {
    getClubList()
  }, []);

  const getClubList = () => {
    getClubInfo().then(res => {
      console.log(res.data)
      if (res.status === 200) setClubList(res.data)
    }).catch(e => { })
  }
  return (
    <div>
      <h1>Clubs Screen</h1>
      <p className="break-words">{JSON.stringify(clubList)}</p>
    </div>
  )
}