import React from 'react';


export default ({ className = 'bottom-div', height = '5.2rem', style }) => {
  return (
    <div className={`${className}`} style={{ height: height, ...style }}>
    </div>
  )
}