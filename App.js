import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import * as reducers from './redux';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import UserRoleScreen from './screens/UserRoleScreen';
import BookModalScreen from './screens/BookModalScreen';
import SignupScreen from './screens/SignupScreen';
import BookingModalScreen from './screens/BookingModalScreen';
import GrapherInfoScreen from './screens/GrapherInfoScreen';
import Config from './config';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

firebase.initializeApp(Config);
const db = firebase.firestore()

const appReducer = combineReducers({ ...reducers });
const store = createStore(appReducer);

export default function Wrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  console.disableYellowBox = true;

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          // ...Ionicons.font,
          // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState} >
          <RootStack.Navigator mode="modal" screenOptions={{ headerShown: false }} >
            <RootStack.Screen name="Main" component={MainStackScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="BookModalScreen" component={BookModalScreen} />
            <RootStack.Screen name="BookingModalScreen" component={BookingModalScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
const MainStackScreen = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="LoadingScreen" component={LoadingScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen name="UserRoleScreen" component={UserRoleScreen} />
      <MainStack.Screen name="SignupScreen" component={SignupScreen}
        options={{
          headerShown: true,
          headerBackTitle: 'back',
          headerTitle: 'Sign up'
        }} />
      <MainStack.Screen name="GrapherInfoScreen" component={GrapherInfoScreen} />
      <MainStack.Screen name="HomeScreen" component={BottomTabNavigator} />
    </MainStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
