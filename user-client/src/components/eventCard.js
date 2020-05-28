import React from 'react';

const whichDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const whichMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default ({ className = "", event }) => {
  const eventDate = new Date(event.start);
  console.log(eventDate);
  return (
    <div className={`bg-white p-2 rounded-lg mb-2 ${className}`}>
      <div className="flex flex-row">
        <img className="h-24 w-24 object-cover" src={event.imageUrl || `https://picsum.photos/seed/${event._id}/400/400`} />
        <div className="w-4" />
        <div>
          <div style={{ color: '#0084ff' }}>
            {whichDay[eventDate.getDay()]},&nbsp;<strong>{eventDate.getDate()}</strong>&nbsp;{whichMonth[eventDate.getMonth()]}
            &nbsp;&nbsp;●&nbsp;&nbsp;{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="w-48 truncate text-xl text-black mt-1 mb-5">{event.title}</div>
          <div className="text-gray-500">{event.createdBy}</div>
        </div>
      </div>

    </div>
  )
}