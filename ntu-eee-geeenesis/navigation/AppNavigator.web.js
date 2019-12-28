import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import MainTabNavigator from './MainTabNavigator';

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});
switchNavigator.path = '';

if (Platform.OS === 'web' && document) {
  const rnwStyleSheet = document.getElementById('react-native-stylesheet')
  if (rnwStyleSheet) {
    rnwStyleSheet.sheet.insertRule(`html {
      overflow: hidden;
      height:100%;
    }`, 0);
  }
}

export default createBrowserApp(switchNavigator, { history: 'hash' });
