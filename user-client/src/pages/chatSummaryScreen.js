import React, { useState, useEffect } from 'react';
import { getMyChatList } from '../api';
import { Link } from 'react-router-dom';
import { SINGLE_CHAT_URL } from '../router/constants.router';
import { Divider, Spin } from 'antd';
import Avatar from '../components/avatar';
import '../css/chat.css';

export default () => {
  const [myChatList, setMyChatList] = useState([]);

  useEffect(() => {
    getChatList()
  }, []);

  const getChatList = () => {
    getMyChatList().then(res => {
      if (res.status === 200) setMyChatList(res.data)
    }).catch(e => { })
  }

  return (
    <div className="max-w-full">
      {
        myChatList.length > 0 ?
          <div>
            <Divider className="chat-divider" />
            {
              myChatList.map((v) => {
                return (
                  <>
                    <Link to={SINGLE_CHAT_URL + "/" + v.networkname + "/" + v.name}>
                      <div className="flex flex-row items-center mt-0">
                        <div>
                          <Avatar className="h-16 w-16" src={v['avatarUrl']} />
                        </div>
                        <div className="ml-5">
                          <span className="text-base text-black">{v.name}</span>
                        </div>
                      </div>
                    </Link>
                    <Divider className="chat-divider" />
                  </>
                )
              })
            }
          </div>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
      {/* <Divider className="chat-divider" />
      {
        myChatList.map((v) => {
          return (
            <>
              <Link to={SINGLE_CHAT_URL + "/" + v.networkname + "/" + v.name}>
                <div className="flex flex-row items-center mt-0">
                  <div>
                    <Avatar className="h-16 w-16" src={v['avatarUrl']} />
                  </div>
                  <div className="ml-5">
                    <span className="text-base text-black">{v.name}</span>
                  </div>
                </div>
              </Link>
              <Divider className="chat-divider" />
            </>
          )
        })
      } */}
    </div >
  )
}