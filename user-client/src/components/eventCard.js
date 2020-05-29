import React, { useState } from 'react';
import { Popover, Button } from 'antd';
import OptionsSVG from '../assets/svg/options.svg';

const whichDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const whichMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default ({ className = "", event, options = false, optionsContent, optionsOnClick = () => { } }) => {
  const eventDate = new Date(event.start);
  const [popoverIsVisible, setPopoverIsVisible] = useState(false);

  const eventOptions = (receiverNetworkName, receiverName, index) => {
    return (
      <div className="pointer-events-auto flex flex-col">
        <Button className="my-1" onClick={() => {
          // let a = []; a[index] = false; setPopoverIsVisible(a);
          // showDeleteConfirm(receiverNetworkName, receiverName);
        }}>Interested</Button>
        <Button className="my-1">Favorite</Button>
      </div>
    )
  }

  const controlEvent = () => {
    setTimeout(() => {
      let d = document.getElementsByClassName('ant-popover');
      for (let i = 0; i < d.length; i++) {
        d[i].onclick = stopEvent;
      }
    }, 50);
  }

  const stopEvent = (e) => {
    e.preventDefault();
  }

  return (
    <div className={`bg-white p-2 rounded-lg mb-2 ${className}`}>
      <div className="flex flex-row">
        <img className="h-24 w-24 object-cover" alt={event.title} src={event.imageUrl || `https://picsum.photos/seed/${event._id}/400/400`} />
        <div className="w-4" />
        <div>
          <div className="flex flex-row">
            <div style={{ color: '#0084ff' }}>
              {whichDay[eventDate.getDay()]},&nbsp;<strong>{eventDate.getDate()}</strong>&nbsp;{whichMonth[eventDate.getMonth()]}
            &nbsp;&nbsp;●&nbsp;&nbsp;{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

          </div>

          <div className="w-48 truncate text-xl text-black mt-1 mb-5">{event.title}</div>
          <div className="text-gray-500">{event.createdBy}</div>
        </div>
        <div className="flex float-right items-start justify-start right-0 mr-0 ml-auto">

        </div>
        {options && (
          <div className="absolute right-0">
            <Popover placement="left"
              trigger="click"
              content={eventOptions}
              visible={popoverIsVisible}
              onVisibleChange={(state) => { setPopoverIsVisible(state) }}
              onClick={controlEvent}
            >
              <span className="text-base text-black"><img alt="options" src={OptionsSVG} style={{ height: '2rem' }} /></span>
            </Popover>
          </div>)}
      </div>

    </div>
  )
}