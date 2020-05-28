import React from 'react';
import DefaultAvatar from '../assets/svg/User.svg';
import EditSVG from '../assets/svg/edit.svg';

export default ({ className = "h-32 w-32", src, bEdit = false }) => {
  return (
    <div className={`${className} p-1 rounded-full flex flex-row`}>
      <img style={{ border: "2px solid #888", objectFit: 'cover' }}
        className={`w-full h-full p-1 rounded-full`} alt="avatar" src={src ? src : DefaultAvatar} />
      {bEdit && <img className="relative bg-gray-200 rounded-full" alt="avatar" src={EditSVG} style={{ width: '1.5rem', height: '1.5rem', padding: '0.2rem', left: '-2rem', top: '6rem' }} />}
    </div>
  )
}