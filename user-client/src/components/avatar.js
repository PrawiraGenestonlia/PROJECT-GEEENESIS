import React from 'react';
import DefaultAvatar from '../assets/svg/User.svg';

export default ({ className = "h-24 w-24", src }) => {
  return (
    <img style={{ border: "2px solid #888", objectFit: 'cover' }}
      className={`${className} p-1 rounded-full`} alt="avatar" src={src ? src : DefaultAvatar} />
  )
}