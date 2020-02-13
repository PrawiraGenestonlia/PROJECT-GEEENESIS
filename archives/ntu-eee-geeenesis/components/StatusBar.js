import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  },

  // rest of the styles
});

export default () => {
  return (
    <View>
      <View style={styles.statusBar} />
      {/* rest of the content */}
    </View>
  )
}

