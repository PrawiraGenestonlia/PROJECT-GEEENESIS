import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Dimensions,
  Text,
} from 'react-native';
import checkAuth from '../utils/checkAuth';

export default function AuthLoadingScreen(props) {
  const { width, height } = Dimensions.get('window');
  useEffect(() => {
    checkAuth(props);
  }, []);

  return (
    <View style={{ flex: 1, height: height }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ marginTop: height * 0.48, alignItems: 'center' }}>
        <Text style={{ padding: 10 }}>Checking authetification</Text>
        <ActivityIndicator />
      </View>
    </View>
  );
}

AuthLoadingScreen.navigationOptions = {
  header: 'none',
};
