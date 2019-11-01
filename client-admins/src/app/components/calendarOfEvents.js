import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '../../../node_modules/@fullcalendar/core/main.css';
import '../../../node_modules/@fullcalendar/daygrid/main.css';
import '../../../node_modules/@fullcalendar/timegrid/main.css';



export default (props) => (
  <React.Fragment>
    <FullCalendar
      className={`${props.className} ${props.class}`}
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
    />
  </React.Fragment>
)