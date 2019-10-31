import React from 'react';

export default (props) => {
  return (
    <div>
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">{props.match.params.club}</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex mt-4">
        <div>{props.match.params.club} content</div>
      </div>
    </div>
  )
}