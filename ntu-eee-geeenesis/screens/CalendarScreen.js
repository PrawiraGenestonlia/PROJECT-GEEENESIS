import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const calendarLink = "https://server.thexdream.net/geeenesis/";

export default function CalendarScreen() {

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}>
        <Text style={styles.optionsTitleText}>
          Calendar ({Platform.OS})
      </Text>
        {
          Platform.OS === 'web' ?
            <View>
              <iframe src={calendarLink} height={deviceHeight} width={deviceWidth} style={{ borderStyle: 'none' }} />
            </View>
            :
            <View>
              <WebView
                source={{ uri: calendarLink }}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{
                  flex: 1, marginTop: 20,
                  width: deviceWidth,
                  height: deviceHeight
                }}
              />
            </View>
        }

      </ScrollView>
    </View>
  );
}

CalendarScreen.navigationOptions = {
  title: 'Calendar of Events',
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