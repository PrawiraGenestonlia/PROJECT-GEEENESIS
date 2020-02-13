import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import checkAuth from '../utils/checkAuth';

const exampleMessage = [
  {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
]

export default function ChatScreen(props) {
  const [messages, setMessages] = useState(exampleMessage);
  const { width, height } = Dimensions.get('window');
  const onSendMessage = (newMessage) => {
    setMessages(GiftedChat.append(messages, newMessage));
  }
  useEffect(() => {
    checkAuth(props);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ width, height: height * 0.85 }}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSendMessage(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </View>
  );
}

ChatScreen.navigationOptions = {
  title: 'Chat',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 24,
    marginBottom: 12,
  },
});