import React, { useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import Touchable from 'react-native-platform-touchable';
import checkAuth from '../utils/checkAuth';
export default function SettingsScreen(props) {
  useEffect(() => {
    checkAuth(props);
  }, []);
  const onLogOut = async () => {
    await AsyncStorage.removeItem('userToken');
    props.navigation.navigate('AuthLoading')
  };
  return (
    <View style={styles.container}>
      <Touchable onPress={() => { onLogOut() }}>
        <Text style={styles.optionsTitleText}>
          Log Out
      </Text>
      </Touchable>

    </View>
  );
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
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
