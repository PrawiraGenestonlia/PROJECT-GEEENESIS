import React from 'react';
import { FULL_CLUB_URL } from '../router/constants.router';

const ClubCard = (props) => (
  <>
    <div className={`w-full ${props.class} ${props.className}`}>
      <div className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl" style={{ minHeight: '19rem' }}>
        <div className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg" style={{ minHeight: '19rem' }}>
          <img className="absolute inset-0 w-full h-full object-cover object-center" src={props.bannerImgLink} alt="" />
          <div className="absolute inset-0 w-full h-full bg-black" style={{ opacity: '0.60' }}></div>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white text-5xl text-center font-bold">
            <span className="w-full h-24">{props.title}</span>
          </div>
        </div>
        <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
          <div className="p-12 md:pr-24 md:pl-16 md:py-12">
            <p className="text-gray-600"><span className="text-gray-900">{props.title}</span> {props.summary}</p>
            <a className="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900" href={`${FULL_CLUB_URL}${props.server_unique_name}/`} target="_blank" rel="noopener noreferrer" >
              <span>Learn more about {props.title}</span>
              <span className="text-xs ml-1">&#x279c;</span>
            </a>
            <a className="flex items-baseline text-green-600 visited:text-green-600 hover:text-green-900 focus:text-green-900"
              href={props.contactLink} target="_blank" rel="noopener noreferrer">
              <span>Contact {props.title}</span>
              <span className="text-2xl ml-1">&#x2706;</span>
            </a>
          </div>
          <svg className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
        </div>
      </div>
    </div>
  </>
)

export default ClubCard;