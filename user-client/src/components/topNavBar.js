import React from 'react';
import BackArrowSVG from '../assets/svg/back-arrow.svg';
import { useHistory } from 'react-router-dom';


export default ({ className = "", style = {}, title = "insert title properties", back = "back", action }) => {
  let history = useHistory();

  const onClickBack = () => {
    action && action();
    history.goBack();
  }

  return (
    <div className={`flex h-10 mb-2 z-50 ${className}`} style={style}>
      <div className="relative w-full h-full" >
        <div className="absolute inset-0 h-full flex fill-current text-black text-lg font-bold items-center justify-center text-center">
          <span className="truncate" style={{ width: '50%' }}>{title}</span>
        </div>
        <div className="absolute h-full" onClick={onClickBack}>
          <img className="h-full object-cover object-center float-left" src={BackArrowSVG} alt="back-arrow" style={{ width: "1.75rem", filter: 'invert(51%) sepia(61%) saturate(6378%) hue-rotate(193deg) brightness(98%) contrast(113%)' }} />
          <div className="flex items-center justify-start h-full">
            <div className="text-center" style={{ color: '#0084ff' }} >{back}</div>
          </div>
        </div>
      </div>
    </div>
  )
}