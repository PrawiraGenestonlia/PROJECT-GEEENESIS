import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/topNavBar';
import { getSpecificClubInfo } from '../api';
import { Spin } from 'antd';

export default (props) => {
  const clubName = props.match.params.club_name || '';
  const clubId = props.match.params.club_id || '';
  const [clubInfo, setClubInfo] = useState({});

  useEffect(() => {
    getClubInfo(clubId)
  }, [clubId]);

  const getClubInfo = (clubId) => {
    getSpecificClubInfo(clubId).then(res => {
      if (res.status === 200) setClubInfo(res.data)
    }).catch(e => { })
  }

  return (
    <div>
      <TopNavBar title={clubName} back="Home" />
      {
        Object.keys(clubInfo).length ?
          <>
            <p>{"//TODO PROPER EVENT PAGE"}</p>
            <p className="break-words">{JSON.stringify(clubInfo)}</p>
          </>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
    </div>
  )
}