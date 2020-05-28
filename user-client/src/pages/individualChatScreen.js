import React, { useState, useEffect, useRef } from 'react';
import TopNavBar from '../components/topNavBar';
import { ChatFeed } from 'react-chat-ui';
import { MessageOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import { getChats, postChats } from '../api';

const { Search } = Input;
const MESSAGE_REFRESH_INTERVAL_MS = 600;

export default (props) => {
  const chatTargetId = props.match.params.target_id || '';
  const chatTargetName = props.match.params.name || '';
  const bottomRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [chatInput, setChatInput] = useState(localStorage.getItem(chatTargetId) || '');
  const [prevTime, setPrevTime] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const sendMessage = () => {
    if (chatInput === '') return null;
    let currentTime = new Date().toISOString();
    setSendingMessage(true);
    postChats(chatTargetId, chatInput, currentTime).then((res) => {
      setSendingMessage(false);
      setMessages([...res]);
      setPrevTime(currentTime);
      localStorage.removeItem(chatTargetId);
      setChatInput('');
      bottomRef.current && bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  }



  const scrollToBottom = (prevTime, chatTime) => {
    if (prevTime !== chatTime) {
      bottomRef.current && bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      console.log("scrolling...");
      setPrevTime(chatTime);
    }
  }

  useEffect(() => {
    let element = document.getElementById('tabbar');
    // element.style.transform = 'translate(0,3.7rem)';
    // element.classList.add("invisible");
    element && element.animate([
      // keyframes
      { transform: 'translateY(0px)' },
      { transform: 'translateY(3.7rem)' }
    ], {
      // timing options
      duration: 100,
      iterations: 1
    });
    element.style.transform = 'translate(0,3.7rem)';
    return () => {
      element.style.transform = 'translate(0rem)';
    };
  }, []);

  const showTab = () => {
    document.getElementById('tabbar').style.transform = 'translate(0rem)';
  }

  useEffect(() => {
    const getMessage = async () => {
      const chatHistory = await getChats(chatTargetId);
      setMessages([...chatHistory]);
      setMessagesLoaded(true);
      chatHistory[chatHistory.length - 1] && scrollToBottom(prevTime, chatHistory[chatHistory.length - 1]['time']);
    }
    const interval = setInterval(() => {
      getMessage();
    }, MESSAGE_REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [chatTargetId, prevTime]);



  return (
    <div className="chat-screen">
      <TopNavBar title={chatTargetName} back="Chats" action={showTab} />

      {
        messagesLoaded ?
          <>
            <ChatFeed
              messages={messages} // Boolean: list of message objects
              isTyping={false} // Boolean: is the recipient typing
              hasInputField={false} // Boolean: use our input, or use your own
              showSenderName // show the name of the user who sent the message
              bubblesCentered={false} />
            <div className="m-4 text-white" ref={bottomRef}>.</div>
          </>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }

      <div className="fixed w-full z-20 msg-box" style={{ left: '0px', bottom: '0' }}>
        <Search
          enterButton={<MessageOutlined />}
          size="large"
          value={chatInput}
          onChange={(e) => {
            localStorage.setItem(chatTargetId, e.target.value);
            setChatInput(e.target.value);
          }}
          onPressEnter={sendMessage}
          onSearch={sendMessage}
          placeholder={"You are chatting with " + chatTargetName}
          style={{ outline: 'none', height: '3rem' }}
          ref={chatBoxRef}
          loading={sendingMessage ? true : false} />
      </div>
    </div>
  );
}