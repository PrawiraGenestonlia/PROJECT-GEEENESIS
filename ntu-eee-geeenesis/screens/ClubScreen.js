import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import checkAuth from '../utils/checkAuth';
import { CLUB_URL } from '../constants/Api';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const clubLink = CLUB_URL;

export default function ClubScreen(props) {
  useEffect(() => {
    checkAuth(props);
  }, []);
  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <View>


        {
          Platform.OS === 'web' ?
            <View>
              <iframe src={clubLink} height={deviceHeight} width={deviceWidth} style={{ borderStyle: 'none' }} />
            </View>
            :
            <View>
              <WebView
                source={{ uri: clubLink }}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={{
                  flex: 1,
                  // marginTop: 20,
                  width: deviceWidth,
                  height: deviceHeight
                }}
              />
            </View>
        }
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

ClubScreen.navigationOptions = {
  title: 'Clubs',
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
