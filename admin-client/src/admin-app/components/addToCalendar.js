import React from 'react';
import AddToCalendar from 'react-add-to-calendar';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';

export default (props) => (
  <div className={`${props.className} ${props.class}`}>
    <AddToCalendar event={props.event} buttonLabel="Create calendar event" buttonTemplate={{ 'calendar-plus-o': 'left' }} />
  </div>
)
