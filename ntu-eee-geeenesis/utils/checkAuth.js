import { AsyncStorage, Platform } from 'react-native';

const _bootstrapAsync = async (props) => {
  // const userToken = await AsyncStorage.getItem('userToken');
  const userToken = await AsyncStorage.getItem('userToken');
  console.log("userToken", userToken);
  props.navigation.navigate(userToken ? 'App' : 'Auth');
}

export default _bootstrapAsync;