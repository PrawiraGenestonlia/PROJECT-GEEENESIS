import React, { useState, useEffect } from 'react';
import { getClubInfo } from '../api';
import { Spin } from 'antd';

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
      {
        clubList.length > 0 ?
          <div>
            <h1>Clubs Screen</h1>
            <p className="break-words">{JSON.stringify(clubList)}</p>
          </div>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
    </div>
  )
}