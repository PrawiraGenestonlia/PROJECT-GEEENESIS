import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';



export default (props) => (
  <React.Fragment>
    <FullCalendar
      className={`${props.className} ${props.class} text-sm`}
      defaultView="dayGridMonth"
      header={{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,'
      }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      // ref={this.calendarComponentRef}
      weekends={true}
      events={props.events}
      dateClick={props.dataClick}
      eventClick={props.eventClick}
      eventMouseEnter={props.eventMouseEnter}

    />
  </React.Fragment>
)