import React from 'react';
import Toolbar from '../components/toolbar';
// import Swal from 'sweetalert2';
import { EventSVG, } from '../components/svgPath';
// import ListOfEventsTag from '../../components/listOfEventsTag';


export default () => {

  const AddSingleEventComponent = (props) => {
    return (
      <div className={`flex bg-grey-lighter ${props.class} ${props.className}`} onClick={() => {
        //TODO Link to create event page 
      }}>
        <div className="w-auto px-4 flex flex-row items-center justify-center px-auto py-2 bg-white text-blue rounded-full shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
            <EventSVG />
          </svg>
          <font className="ml-2 text-base leading-normal text-blue-500">Create event</font>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">Event Management</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex flex-col mt-4">
        <div className="px-3 py-4 flex justify-center select-auto ">
          <Toolbar>
            <AddSingleEventComponent className="py-2 md:py-0 md:px-2 justify-center" />
          </Toolbar>
        </div>
        <div>content</div>
      </div>
    </div>
  )
}