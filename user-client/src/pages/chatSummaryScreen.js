import React, { useState, useEffect } from 'react';
import { getMyChatList, clearChat } from '../api';
import { Link } from 'react-router-dom';
import { SINGLE_CHAT_URL } from '../router/constants.router';
import { Divider, Spin, Popover, Button, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Avatar from '../components/avatar';
import OptionsSVG from '../assets/svg/options.svg';
import '../css/chat.css';


const { confirm } = Modal;

export default () => {
  const [myChatList, setMyChatList] = useState([]);
  const [popoverIsVisible, setPopoverIsVisible] = useState([]);

  useEffect(() => {
    getChatList()
  }, []);

  const getChatList = () => {
    getMyChatList().then(res => {
      if (res.status === 200) setMyChatList(res.data)
    }).catch(e => { })
  }

  const showDeleteConfirm = (receiverNetworkName, receiverName) => {
    confirm({
      title: `Are you sure you want to clear this chat with ${receiverName}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Note that the chat from both parties will be cleared.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        clearChat(receiverNetworkName).then(() => {
          message.success("Messages have been cleared", 5);
        }).catch(async () => {
          message.error("Messages have not been cleared", 5);
        });
      },
      onCancel() {
        message.error("Messages have not been cleared", 5);
      },
    });
  }

  const chatOptions = (receiverNetworkName, receiverName, index) => {
    return (
      <div className="pointer-events-auto">
        <Button onClick={() => {
          let a = []; a[index] = false; setPopoverIsVisible(a);
          hidePopover();
          showDeleteConfirm(receiverNetworkName, receiverName);
        }}>clear chat</Button>
      </div>
    )
  }

  const stopEvent = (e) => {
    e.preventDefault();
  }

  const controlEvent = () => {
    setTimeout(() => {
      let d = document.getElementsByClassName('ant-popover');
      for (let i = 0; i < d.length; i++) {
        d[i].onclick = stopEvent
      }
    }, 50);
  }

  const hidePopover = () => {
    setTimeout(() => {
      let d = document.getElementsByClassName('ant-popover');
      for (let i = 0; i < d.length; i++) {
        // d[i].className = "ant-popover-hidden";
      }
    }, 50);
  }

  return (
    <div className="max-w-full">
      {
        myChatList.length > 0 ?
          <div>
            {
              myChatList.map((v, i) => {
                return (
                  <div key={i}>
                    <Link to={SINGLE_CHAT_URL + "/" + v.networkname + "/" + v.name}>
                      <div className="flex flex-row items-center mt-0" >
                        <div>
                          <Avatar className="h-16 w-16" src={v['avatarUrl']} />
                        </div>
                        <div className="ml-5 float-left">
                          <span className="text-base text-black">{v.name}</span>
                        </div>
                        <div className="float-right items-end justify-end right-0 mr-0 ml-auto">
                          <Popover placement="left" content={chatOptions(v.networkname, v.name, i)} trigger="click"
                            visible={popoverIsVisible[i]}
                            onVisibleChange={(state) => { let a = []; a[i] = state; setPopoverIsVisible(a) }}
                            onClick={() => { controlEvent() }}>
                            <span className="text-base text-black"><img alt="options" src={OptionsSVG} style={{ height: '3rem' }} /></span>
                          </Popover>
                        </div>
                      </div>
                    </Link>
                    <Divider className="chat-divider" />
                  </div>
                )
              })
            }
            {/* <div className="bg-black w-64 h-64" style={{ position: 'absolute', top: '-50px' }}>
              zz
            </div> */}
          </div>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
    </div >
  )
}