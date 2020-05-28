import React, { useState, useEffect } from 'react';
import { getEvents } from '../api';
import { message, Modal, Button } from 'antd';
import { EVENT_STANDALONE_URL } from '../router/constants.router';
import BottomDiv from '../components/bottomDiv';
import EventCard from '../components/eventCard';
import AddToCalendar from 'react-add-to-calendar';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';


const Calendar = (props) => {
  return (
    <div className="bg-white p-2 rounded-lg" style={{ boxShadow: '0 0px 25px 10px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
      <FullCalendar
        className={`${props.className} ${props.class} `}
        defaultView="dayGridMonth"
        header={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,'
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        weekends={true}
        events={props.events}
        dateClick={props.dateClick}
        eventClick={props.eventClick}
        eventMouseEnter={props.eventMouseEnter}
        droppable={true}
        themeSystem={'Litera'}
        height='auto'
      />
    </div>
  )
}

const AddToCalendarComponent = (props) => {
  return (
    <AddToCalendar event={props.event} buttonLabel="Add to my calendar" buttonTemplate={{ 'calendar-plus-o': 'left' }} />
  )
}

export default () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDateEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    const loadData = () => {
      getEvents({}).then(async res => {
        setEvents([...res.data]);
      }).catch(async err => {
        console.log(err);
        let messages = err.data ? err.data : JSON.stringify(err);
        message.error(messages, 5);
      });
    };
    loadData();
  }, []);

  const handleEventClick = async (e) => {
    const clickedEvent = {
      title: e.event._def.title,
      ...e.event._def.extendedProps
    }
    setSelectedEvent(clickedEvent);
    setModalOpen(true);
  }

  const handleDateClick = (e) => {
    const clickedDate = e.event ? new Date(e.event.start) : new Date(e.dateStr);
    const listOfEvents = events.filter((event) => {
      let startDate = new Date(event.start);
      let endDate = new Date(event.end);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      clickedDate.setHours(0, 0, 0, 0);
      if (clickedDate.getTime() >= startDate.getTime() && clickedDate.getTime() <= endDate.getTime()) {
        return event
      }
    });
    setSelectedEvents([...listOfEvents]);
  }

  const handleModalOk = e => {
    console.log(e);
    setModalOpen(false);
  };

  const handleModalCancel = e => {
    console.log(e);
    setModalOpen(false);
  };

  return (
    <div className="h-full max-h-full z-0">
      <Calendar events={events}
        eventClick={handleDateClick}
        eventClick2={handleEventClick}
        dateClick={handleDateClick} />
      <div className="mt-3 mb-3" style={{ height: '1px', backgroundColor: '#bdc0c7' }} />
      {
        selectedDateEvents.map((event, index) => {
          return (
            <div className="truncate" key={index}>
              <EventCard event={event} />
            </div>
          )
        })
      }
      <div>
        <Modal title={selectedEvent.title}
          wrapClassName="text-center"
          visible={modalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={[
            <Button key="back" onClick={handleModalCancel}>
              Return
            </Button>,
            <Button key="signup" type="primary" onClick={handleModalOk}>
              Sign Up
            </Button>,
          ]}>
          <div className="flex flex-col">
            <div className="flex justify-center">
              <AddToCalendarComponent event={selectedEvent} />
            </div>
            <p className="mt-4">{selectedEvent.description}</p>
            <div className="flex flex-col">
              <a className="mt-1 text-indigo-600 visited:text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
                href={EVENT_STANDALONE_URL + selectedEvent.uniqueName} target="_blank" rel="noopener noreferrer">
                <p className="text-center">Click here to visit event page<span className="text-ls ml-1">&#x279c;</span></p>
              </a>
            </div>
          </div>
        </Modal>
      </div>
      <BottomDiv />
    </div>
  )
}