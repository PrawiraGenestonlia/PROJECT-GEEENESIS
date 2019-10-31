import React, { useState } from 'react';
import ClubCard from '../components/clubCard';
import Toolbar from '../components/toolbar';
import { Link } from 'react-router-dom';
import { sampleDataClubInfo } from '../sampleData';
import { EDITOR_URL } from '../../constants';
import { EditSVG } from '../components/svgPath';

export default () => {
  const [clubsData, setClubsData] = useState(sampleDataClubInfo);

  const EditClubComponent = (props) => (
    <Link to={EDITOR_URL + props.server_unique_name + "/"}>
      <div className={`flex bg-grey-lighter ${props.class} ${props.className}`}>
        <div className="w-auto px-4 flex flex-row items-center justify-center px-auto py-2 bg-white text-blue rounded-full shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 381.53417 381">
            <EditSVG />
          </svg>
          <font className="ml-2 text-base leading-normal text-blue-500">Edit {props.title}</font>
        </div>
      </div>
    </Link>
  )

  return (
    <div>
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">Information</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex flex-col mt-4">
        <div className="px-3 py-4 flex justify-center select-auto">
          <Toolbar>
            {
              clubsData.clubs.length && clubsData.clubs.map((club, index) => {
                return (
                  <div className="px-2" key={index}>
                    <EditClubComponent
                      title={club.title}
                      server_unique_name={club.server_unique_name}
                    />
                  </div>
                )
              })
            }
          </Toolbar>
        </div>
        <div className="px-3 py-4 flex flex-col justify-center">
          {
            clubsData.clubs.length && clubsData.clubs.map((club, index) => {
              return (
                <div className="my-8" key={index}>
                  <ClubCard
                    title={club.title}
                    bannerImgLink={club.bannerImgLink}
                    server_unique_name={club.server_unique_name}
                    summary={club.summary}
                    rawEditor={club.rawEditor}
                  />
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}