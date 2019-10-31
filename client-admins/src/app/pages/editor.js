import React, { useState, useEffect } from 'react';

export default (props) => {
  const [subject, setSubject] = useState(props.match.params.subject);

  useEffect(() => {
    setSubject(props.match.params.subject);
    // return () => {
    //   cleanup
    // };
  }, [props]);

  return (
    <div>
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">Editor ({subject})</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex mt-4">
        <div>content</div>
      </div>
    </div>
  )
}