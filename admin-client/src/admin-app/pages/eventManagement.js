import React, { useState, useEffect } from 'react';
import Toolbar from '../components/toolbar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { EventSVG, } from '../components/svgPath';
import { EVENT_EDITOR_URL } from '../../constants';
// import ListOfEventsTag from '../../components/listOfEventsTag';
import { GetEmail, GetEvent, DeleteEvent } from '../../api';

const MySwal = withReactContent(Swal);

export default (props) => {
  const [listOfMyEvents, setListOfMyEvents] = useState([]);

  useEffect(() => {
    GetEmail().then(res => {
      GetEvent({ eventCreator: res.data }).then(async res => {
        setListOfMyEvents([...res.data]);
      }).catch(async err => {
        let message = err.data ? err.data : JSON.stringify(err);
        await Swal.fire('Failed to fetch information!', message, 'error');
      });
    }).catch(async err => {
      let message = err.data ? err.data : JSON.stringify(err);
      await Swal.fire('Failed to fetch information!', message, 'error');
    });
  }, [props]);

  const handleEditEventClick = async (e) => {
    const { value: formValues } = await MySwal.fire({
      title: `Edit event`,
      width: 'auto',
      html: <ListOfEventsDropdownComponent />,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Edit',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        return document.getElementById('selectedEventForEdit').value
      }
    });
    if (formValues) {
      //
      let url = EVENT_EDITOR_URL + formValues;
      props.history.push(url);
    }
  }

  const handleDeleteEventClick = async (e) => {
    const { value: formValues } = await MySwal.fire({
      title: `Delete event`,
      width: 'auto',
      html: <ListOfEventsDropdownComponent />,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
      preConfirm: () => {
        return document.getElementById('selectedEventForEdit').value
      }
    });
    if (formValues) {
      Swal.fire({ title: 'Deleting', allowEscapeKey: false, allowOutsideClick: false, onOpen: () => { Swal.showLoading() } });
      DeleteEvent(formValues).then(async (res) => {
        if (res.status === 200) await Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }).catch(async (err) => {
        let message = err.data;
        await Swal.fire('Not deleted!', message, 'error');
      });
    }
  }

  const ListOfEventsDropdownComponent = () => (
    <div>
      {
        listOfMyEvents.length > 0 ?
          <div>
            <select id="selectedEventForEdit">
              <option key={-1} value=''>Select an event</option>
              {listOfMyEvents.map((event, index) => {
                return <option key={index} value={event.uniqueName}>{event.title}</option>
              })}
            </select>
          </div> :
          <div>You have no events</div>
      }
    </div>
  )

  const AddSingleEventComponent = (props) => {
    return (
      <Link to={EVENT_EDITOR_URL + "new/"}>
        <div className={`flex bg-grey-lighter ${props.class} ${props.className}`} >
          <div className="w-auto px-4 flex flex-row items-center justify-center px-auto py-2 bg-white text-blue rounded-full shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
            <svg className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
              <EventSVG />
            </svg>
            <font className="ml-2 text-base leading-normal text-blue-500">Create event</font>
          </div>
        </div>
      </Link>
    )
  }

  const EditEventComponent = (props) => {
    return (
      <div className={`flex bg-grey-lighter cursor-pointer ${props.class} ${props.className}`} onClick={() => { handleEditEventClick() }}>
        <div className="w-auto px-4 flex flex-row items-center justify-center px-auto py-2 bg-white text-blue rounded-full shadow-lg  border border-blue">
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
            <EventSVG />
          </svg>
          <div className="ml-2 text-blue-500">Edit event</div>
        </div>
      </div>
    )
  }

  const DeleteEventComponent = (props) => {
    return (
      <div className={`flex bg-grey-lighter cursor-pointer ${props.class} ${props.className}`} onClick={() => { handleDeleteEventClick() }}>
        <div className="w-auto px-4 flex flex-row items-center justify-center px-auto py-2 bg-white text-blue rounded-full shadow-lg  border border-blue">
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
            <EventSVG />
          </svg>
          <div className="ml-2 text-blue-500">Delete event</div>
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
            <EditEventComponent className="py-2 md:py-0 md:px-2 justify-center" />
            <DeleteEventComponent className="py-2 md:py-0 md:px-2 justify-center" />
          </Toolbar>
        </div>
        <div>Show all events</div>
      </div>
    </div>
  )
}