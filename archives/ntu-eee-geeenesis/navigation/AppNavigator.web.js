import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: LoginScreen,
    App: MainTabNavigator,
  }
);

switchNavigator.path = '';

if (Platform.OS === 'web' && document) {
  const rnwStyleSheet = document.getElementById('react-native-stylesheet')
  if (rnwStyleSheet) {
    //
  }
}

export default createBrowserApp(switchNavigator, { history: 'hash' });
