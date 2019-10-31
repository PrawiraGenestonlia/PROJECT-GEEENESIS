import React from 'react';
import { ToolsSVG } from './svgPath';

export default (props) => {
  return (
    <div className="flex flex-row h-20 items-center bg-indigo-100 w-full text-md shadow-md rounded mb-4">
      <div className="pl-5 pr-3">
        <svg className="w-10 h-10 text-black" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1708 1708.7495">
          <ToolsSVG />
        </svg>
      </div>
      {props.children}
    </div>
  )
}