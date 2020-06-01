import React from 'react';
import './horizontalCardScroll.css';

export default ({ className = "", title = "insert title properties", children }) => {
  return (
    <div className={`flex-none w-full rounded-lg ${className} z-20`} style={{ backgroundColor: 'white' }}>
      <div className="m-3 z-20">
        <div>
          <span className="text-black font-bold z-20">{title}</span>
        </div>
        <div className="horizontal-card-scroll mt-2">
          {children}
        </div>
      </div>
    </div>
  )
}