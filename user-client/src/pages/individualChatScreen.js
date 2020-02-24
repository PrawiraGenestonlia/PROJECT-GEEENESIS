import React, { useState, useEffect, useRef } from 'react';
import { ChatFeed } from 'react-chat-ui';
import { Input, Icon } from 'antd';

const { Search } = Input;

const sampleMessages = [
  { id: 1, message: "first message", senderName: "test sender", time: new Date() },
  { id: 0, message: "i reply to first message", senderName: "wira", time: new Date() },
  { id: 1, message: "thanks ya", senderName: "test sender", time: new Date() },
  { id: 1, message: "first message", senderName: "test sender", time: new Date() },
  { id: 0, message: "i reply to first message", senderName: "wira", time: new Date() },
  { id: 1, message: "thanks ya", senderName: "test sender", time: new Date() },
  { id: 1, message: "first message", senderName: "test sender", time: new Date() },
  { id: 0, message: "i reply to first message", senderName: "wira", time: new Date() },
  { id: 1, message: "thanks ya", senderName: "test sender", time: new Date() },
  { id: 1, message: "first message", senderName: "test sender", time: new Date() },
  { id: 0, message: "i reply to first message", senderName: "wira", time: new Date() },
  { id: 1, message: "thanks ya", senderName: "test sender", time: new Date() },
  { id: 1, message: "first message", senderName: "test sender", time: new Date() },
  { id: 0, message: "i reply to first message", senderName: "wira", time: new Date() },
  { id: 1, message: "thanks ya", senderName: "test sender", time: new Date() },
]

export default (props) => {
  const chatTargetId = props.match.params.target_id || '';
  const chatTargetName = props.match.params.name || '';
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState(sampleMessages);
  const [chatInput, setChatInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const sendMessage = () => {
    let message = { id: 0, message: chatInput, senderName: "me", time: new Date() }
    setSendingMessage(true);
    setMessages((oldMessage) => [...oldMessage, message]);
    setChatInput('');
    scrollToBottom();
    setTimeout(() => {
      setSendingMessage(false);
    }, 2000);
  }

  const getMessage = () => {
    console.log("refresh");
  }

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }



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
          enterButton={<Icon type="message" />}
          size="large"
          value={chatInput}
          onChange={(e) => { setChatInput(e.target.value) }}
          onPressEnter={sendMessage}
          onSearch={sendMessage}
          placeholder="message"
          loading={sendingMessage ? true : false} />
      </div>
    </div>
  )
}