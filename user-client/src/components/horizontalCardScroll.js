import React from 'react';
import './horizontalCardScroll.css';

export default ({ className = "", title = "insert title properties", children }) => {
  return (
    <div className={`flex-none w-full rounded-lg ${className}`} style={{ backgroundColor: 'white' }}>
      <div className="m-3">
        <div>
          <strong className="text-black">{title}</strong>
        </div>
        <div className="horizontal-card-scroll mt-2">
          {children}
        </div>
      </div>
    </div>
  )
}