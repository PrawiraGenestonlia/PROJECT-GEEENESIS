import React, { useState, useEffect } from 'react';
import { getClubInfo } from '../api';
import ClubCard from '../components/clubCard';
import { Spin } from 'antd';

export default () => {
  const [clubList, setClubList] = useState([]);

  useEffect(() => {
    getClubList()
  }, []);

  const getClubList = () => {
    getClubInfo().then(res => {
      if (res.status === 200) setClubList(res.data)
    }).catch(e => { })
  }
  return (
    <div>
      {
        clubList.length > 0 ?
          <div>
            {clubList.map((club, index) => {
              return (
                <div className="mb-8" key={index}>
                  <ClubCard
                    title={club.title}
                    bannerImgLink={club.bannerImgLink}
                    server_unique_name={club.server_unique_name}
                    summary={club.summary}
                    rawEditor={club.rawEditor}
                    contactLink={club.contactLink}
                  />
                </div>
              )
            })
            }
          </div>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
    </div>
  )
}