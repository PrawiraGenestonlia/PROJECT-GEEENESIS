import React from 'react';
import { View, Text, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default function LoginScreen(props) {
  const onSignIn = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    props.navigation.navigate('App')
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.optionsTitleText}>
        Login Page
      </Text>
      <Touchable onPress={() => { onSignIn() }}>
        <Text>Login</Text>
      </Touchable>
    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
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
