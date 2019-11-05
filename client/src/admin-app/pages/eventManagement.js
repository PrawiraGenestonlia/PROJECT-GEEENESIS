import React, { useState, useEffect } from 'react';
import Toolbar from '../components/toolbar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { EventSVG, } from '../components/svgPath';
import { EVENT_EDITOR_URL } from '../../constants';
// import ListOfEventsTag from '../../components/listOfEventsTag';
import { GetEmail, GetEvent } from '../../api';

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
    const confirmation = await MySwal.fire({
      title: `Edit event`,
      width: 'auto',
      html: <ListOfEventsDropdownComponent />,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Edit',
      cancelButtonText: 'Cancel'
    });
    if (confirmation.value) {
      //
    }
  }

  const ListOfEventsDropdownComponent = () => (
    <div>
      {console.log(listOfMyEvents)}
      {/* //TODO */}
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
      <div className={`flex bg-grey-lighter ${props.class} ${props.className}`} onClick={() => { handleEditEventClick() }}>
        <div className="w-auto px-4 flex flex-row items-center justify-center px-auto py-2 bg-white text-blue rounded-full shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58">
            <EventSVG />
          </svg>
          <font className="ml-2 text-base leading-normal text-blue-500">Edit event</font>
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
          </Toolbar>
        </div>
        <div>content</div>
      </div>
    </div>
  )
}