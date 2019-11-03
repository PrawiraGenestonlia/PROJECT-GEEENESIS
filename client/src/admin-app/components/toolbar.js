import React from 'react';
// import { ToolsSVG } from './svgPath';

export default (props) => {
  return (
    <div className={`text-center items-center justify-center md:justify-start flex flex-row md:flex-no-wrap h-full p-2 items-center bg-indigo-100 w-full text-md shadow-md rounded mb-4 ${props.className} ${props.class}`}>
      {/* <div className="md:pl-5 md:pr-3">
        <svg className="hidden md:block w-10 h-10 text-black" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1708 1708.7495">
          <ToolsSVG />
        </svg>
      </div> */}
      <div className="md:flex">
      {props.children}
      </div>
    </div>
  )
}