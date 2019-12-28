import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ExpoConfigView } from '@expo/samples';

function DefaultSettingsScreen() {
  return <ExpoConfigView />;
}

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.optionsTitleText}>
        Setting
      </Text>
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
