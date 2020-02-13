import React, { useState, useEffect } from 'react';
import ClubCard from '../components/clubCard';
import Toolbar from '../components/toolbar';
import { Link } from 'react-router-dom';
import { EDITOR_URL } from '../../constants';
import { EditSVG } from '../components/svgPath';
import { GetRole, GetClubInfo } from '../../api';
import Swal from 'sweetalert2';
import AllClubStandalonePage from './allClubStandalonePage';

export default () => {
  const [clubsData, setClubsData] = useState({ clubs: [] });
  const [role, setRole] = useState('student');

  useEffect(() => {
    GetRole().then((res) => { setRole(res.data) });
  }, []);

  useEffect(() => {
    GetClubInfo().then(async res => {
      setClubsData({ clubs: res.data });
    }).catch(async err => {
      let message = err.data;
      await Swal.fire('Failed to fetch information!', message, 'error');
    });
  }, []);

  const EditClubComponent = (props) => (
    <Link to={EDITOR_URL + props.server_unique_name + "/"}>
      <div className={`flex justify-center bg-grey-lighter ${props.class} ${props.className}`}>
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
          {role === "superadmin" || role === "clubadmin" ? <Toolbar>
            {
              (clubsData.clubs.length > 0) && clubsData.clubs.map((club, index) => {
                return (
                  <div className="py-2 md:py-0 md:px-2 justify-center" key={index}>
                    <EditClubComponent
                      title={club.title}
                      server_unique_name={club.server_unique_name}
                    />
                  </div>
                )
              })
            }
          </Toolbar> : <></>}
        </div>
        <AllClubStandalonePage />
      </div>
    </div>
  )
}