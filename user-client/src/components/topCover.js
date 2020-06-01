import React from 'react';

const TopCover = ({ style = {}, className = "" }) => {
  return (
    <div className={`absolute w-full h-48 left-0 ${className}`} style={{ top: '0px', zIndex: 1, ...style }} />
  )
}

export default TopCover;