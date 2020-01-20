import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

StatusBar.setBarStyle('light-content');

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: LoginScreen,
      App: MainTabNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
