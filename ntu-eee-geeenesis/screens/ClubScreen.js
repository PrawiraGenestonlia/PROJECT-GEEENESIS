import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, Dimensions, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import checkAuth from '../utils/checkAuth';
import Touchable from 'react-native-platform-touchable';
import { CLUB_URL } from '../constants/Api';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const clubLink = CLUB_URL;


export default function ClubScreen(props) {
  this.navigationOptions = {
    title: "clubs"
  };
  useEffect(() => {
    checkAuth(props);
  }, []);
  return (
    <View style={styles.container}>

      <ScrollView bounces={false}>
        <View>


          {
            Platform.OS === 'web' ?
              <View>
                <iframe src={clubLink} height={deviceHeight * 0.8} width={deviceWidth} style={{ borderStyle: 'none' }} />
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
                    height: deviceHeight * 0.81
                  }}
                />
              </View>
          }
        </View>
        <View style={{ padding: 5, alignItems: 'center', backgroundColor: '#dedede' }}>
          <Touchable onPress={() => props.navigation.replace('Club')}>
            <Text style={{}}>Click here to go back to the summary page</Text>
          </Touchable>
        </View>
      </ScrollView>
    </View>
  );
}

ClubScreen.navigationOptions = {
  headerTitle: <Text onPress={() => { props.navigation.replace('Club') }}>Clubs</Text>,
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
