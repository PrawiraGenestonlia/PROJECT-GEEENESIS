import React, { useState, useEffect } from 'react';
import { getMyChatList } from '../api';
import { Link } from 'react-router-dom';
import { SINGLE_CHAT_URL } from '../router/constants.router';

export default () => {
  const [myChatList, setMyChatList] = useState([]);

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
      {
        myChatList.map((v) => {
          return (
            <div>
              <Link to={SINGLE_CHAT_URL + "/" + v.networkname + "/" + v.name}>{v.name}</Link>
            </div>
          )
        })
      }
    </div>
  )
}