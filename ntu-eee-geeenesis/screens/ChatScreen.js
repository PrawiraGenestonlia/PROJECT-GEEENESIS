import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function ChatScreen() {

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}>
        <Text style={styles.optionsTitleText}>
          Chat
      </Text>
      </ScrollView>
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