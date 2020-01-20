import React, { useState, useEffect } from 'react';
import ClubCard from '../components/clubCard';
import { GetClubInfo } from '../../api';
import Swal from 'sweetalert2';

export default () => {
  const [clubsData, setClubsData] = useState({ clubs: [] });
  const [role, setRole] = useState('student');

  useEffect(() => {
    GetClubInfo().then(async res => {
      setClubsData({ clubs: res.data });
    }).catch(async err => {
      let message = err.data;
      await Swal.fire('Failed to fetch information!', message, 'error');
    });
  }, []);

  return (
    <div>
      <div className="px-3 py-4 flex flex-col justify-center">
        {
          (clubsData.clubs.length > 0) && clubsData.clubs.map((club, index) => {
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
    </div>
  )
}