import React, { useState, useEffect, useRef } from 'react';
import { ChatFeed } from 'react-chat-ui';
import { MessageOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { getChats, postChats } from '../api';

const { Search } = Input;
const MESSAGE_REFRESH_INTERVAL_MS = 600;

export default (props) => {
  const chatTargetId = props.match.params.target_id || '';
  const chatTargetName = props.match.params.name || '';
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
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
      setChatInput('');
      bottomRef.current && bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  }



  const scrollToBottom = (prevTime, chatTime) => {
    if (prevTime != chatTime) {
      setPrevTime(chatTime);
      bottomRef.current && bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      console.log("scrolling...");
    }
  }

  useEffect(() => {
    const getMessage = async () => {
      const chatHistory = await getChats(chatTargetId);
      setMessages([...chatHistory]);
      scrollToBottom(prevTime, chatHistory[chatHistory.length - 1]['time']);
    }
    const interval = setInterval(() => {
      getMessage();
    }, MESSAGE_REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [chatTargetId, prevTime]);

  return (
    <div className="chat-screen">
      <p className="flex justify-center">You are chatting with {chatTargetName} - {chatTargetId}</p>
      <ChatFeed
        messages={messages} // Boolean: list of message objects
        isTyping={false} // Boolean: is the recipient typing
        hasInputField={false} // Boolean: use our input, or use your own
        showSenderName // show the name of the user who sent the message
        bubblesCentered={false} />
      <div className="m-2 text-white" ref={bottomRef}>.</div>
      <div className="fixed w-full z-20 " style={{ left: '0px', bottom: '0' }}>
        <Search
          enterButton={<MessageOutlined />}
          size="large"
          value={chatInput}
          onChange={(e) => { setChatInput(e.target.value) }}
          onPressEnter={sendMessage}
          onSearch={sendMessage}
          placeholder={"You are chatting with " + chatTargetName}
          style={{ outline: 'none' }}
          loading={sendingMessage ? true : false} />
      </div>
    </div>
  );
}