import React, { useState, useEffect } from 'react';
import { getMyChatList } from '../api';

export default () => {
  const [myChatList, setMyChatList] = useState({});

  useEffect(() => {
    getChatList()
  }, []);

  const getChatList = () => {
    getMyChatList().then(res => {
      console.log(res.data)
      if (res.status === 200) setMyChatList(res.data)
    }).catch(e => { })
  }

  return (
    <div className="max-w-full">
      <p className="break-words">{JSON.stringify(myChatList)}</p>
    </div>
  )
}