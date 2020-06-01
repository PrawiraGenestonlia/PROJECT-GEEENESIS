import React, { useState } from 'react';
import { Popover, Button, message } from 'antd';
import OptionsSVG from '../assets/svg/options.svg';
import { EVENT_BUTTON_OPTIONS, THEME_COLOR } from '../enum';
import { addFavEvent, addInterestedEvent, delInterestedEvent, delFavEvent, addParticipatedEvent, delParticipatedEvent } from '../api';

const whichDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const whichMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default ({ className = "", event, options = false, action = {}, refresh }) => {
  const eventDate = new Date(event.start);
  const [popoverIsVisible, setPopoverIsVisible] = useState(false);
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  const eventOptions = () => {
    return (
      <div className="pointer-events-auto flex flex-col">
        {action[EVENT_BUTTON_OPTIONS.ADD_FAV] && <Button className="my-1" onClick={() => {
          addFavEvent(event).then(() => { message.success(`${event.title} added to favourite!`, 5); refresh(); }).catch(e => { });
        }}>Favourite</Button>}
        {action[EVENT_BUTTON_OPTIONS.DEL_FAV] && <Button danger className="my-1" onClick={() => {
          delFavEvent(event).then(() => { message.success(`${event.title} removed from favourite!`, 5); refresh(); }).catch(e => { });
        }}>Unfavourite</Button>}
        {action[EVENT_BUTTON_OPTIONS.ADD_INT] && <Button className="my-1" onClick={() => {
          addInterestedEvent(event).then(() => { message.success(`${event.title} added to interested!`, 5); refresh(); }).catch(e => { });
        }}>Interested</Button>}
        {action[EVENT_BUTTON_OPTIONS.DEL_INT] && <Button danger className="my-1" onClick={() => {
          delInterestedEvent(event).then(() => { message.success(`${event.title} removed from interested!`, 5); refresh(); }).catch(e => { });
        }}>Uninterested</Button>}
        {action[EVENT_BUTTON_OPTIONS.ADD_PART] && <Button className="my-1" onClick={() => {
          addParticipatedEvent(event).then(() => { message.success(`${event.title} added to participated!`, 5); refresh(); }).catch(e => { });
        }}>Participated</Button>}
        {action[EVENT_BUTTON_OPTIONS.DEL_PART] && <Button danger className="my-1" onClick={() => {
          delParticipatedEvent(event).then(() => { message.success(`${event.title} removed from participated!`, 5); refresh(); }).catch(e => { });
        }}>Unparticipated</Button>}
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
    <div className={`relative p-2 rounded-lg mb-2 ${className}`} style={{ backgroundColor: THEME_COLOR['BACKGROUND_SECONDARY'] }}>
      <div className="flex flex-row">
        <img className="h-24 w-24 object-cover" alt={event.title} src={event.imageUrl || `https://picsum.photos/seed/${event._id}/400/400`} />
        <div className="w-4" />
        <div>
          <div className="flex flex-row">
            <div className={screenWidth < 361 ? "text-xs" : ''} style={{ color: '#0084ff' }}>
              {whichDay[eventDate.getDay()]},&nbsp;<strong>{eventDate.getDate()}</strong>&nbsp;{whichMonth[eventDate.getMonth()]}
            &nbsp;&nbsp;●&nbsp;&nbsp;{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

          </div>

          <div className="w-40 truncate text-xl mt-1 mb-3" style={{ color: THEME_COLOR['FONT'] }}>{event.title}</div>
          <div className="text-gray-500">{event.createdBy}</div>
        </div>
        <div className="flex float-right items-start justify-start right-0 mr-0 ml-auto">

        </div>
        {options && (
          <div className="absolute" style={{ right: '0' }}>
            <Popover placement="left"
              trigger="click"
              content={eventOptions}
              visible={popoverIsVisible}
              onVisibleChange={(state) => { setPopoverIsVisible(state) }}
              onClick={controlEvent}
            >
              <span className="text-base text-black"><img alt="options" src={OptionsSVG} style={{ height: '2rem', filter: THEME_COLOR['ICON_FILTER'] }} /></span>
            </Popover>
          </div>)}
      </div>

    </div>
  )
}