import React, { useState } from 'react';
import AddToCalendar from '../components/addToCalendar';
import CalendarOfEvents from '../components/calendarOfEvents';
import { sampleDataEvents } from '../sampleData';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';

const MySwal = withReactContent(Swal)

export default () => {
  const [events, setEvents] = useState(sampleDataEvents);

  const handleEventClick = async (e) => {
    const clickedEvent = {
      title: e.event._def.title,
      ...e.event._def.extendedProps
    }
    console.log(clickedEvent);
    const confirmation = await MySwal.fire({
      title: `${e.event._def.title}`,
      width: 'auto',
      html: <ModalDescription event={clickedEvent} />,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sign Up',
      cancelButtonText: 'Cancel'
    });
    if (confirmation.value) {
      window.open(clickedEvent.signUpLink, "_blank");
    }
  }

  const ModalDescription = (props) => (
    <div className="flex flex-col h-auto">
      <div className="h-12 p-3 mb-5">
        <AddToCalendar event={props.event} />
      </div>
      <p>{props.event.description}</p>
      <div className="flex flex-col mt-2">
        <a className="mt-3 text-indigo-600 visited:text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
          href={props.contactLink} target="_blank" rel="noopener noreferrer">
          <span>Click here to visit event page<span className="text-ls ml-1">&#x279c;</span></span>
        </a>
      </div>

    </div>
  )

  return (
    <div>
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">Calendar of Events</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex flex-col mt-4">
        <div>
          <CalendarOfEvents events={events} eventClick={handleEventClick} />
        </div>

      </div>
    </div>
  )
}