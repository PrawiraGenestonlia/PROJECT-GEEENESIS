import React from 'react';
import { THEME_COLOR } from '../enum';
import './horizontalCardScroll.css';

export default ({ className = "", title = "insert title properties", children }) => {
  return (
    <div className={`flex-none w-full rounded-lg ${className} z-20`} style={{ backgroundColor: THEME_COLOR['BACKGROUND_SECONDARY'] }}>
      <div className="m-3 z-20">
        <div>
          <span className="font-bold z-20" style={{ color: THEME_COLOR['FONT'] }}>{title}</span>
        </div>
        <div className="horizontal-card-scroll mt-2" style={{ color: THEME_COLOR['FONT'] }}>
          {children}
        </div>
      </div>
    </div>
  )
}