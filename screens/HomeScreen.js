import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Right, Icon, Button, Left, Thumbnail } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import firebase from 'firebase'
import '@firebase/firestore';
import { MonoText } from '../components/StyledText';
import Home from '../components/Home';
import GrapherHome from '../components/GrapherHome';
// static.navigationOptions = {
//   header: null,
// };
const HomeScreen = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [isBook, setIsBook] = useState(false);
  const [graphers, setGraphers] = useState([]);
  const [userUri, setUserUri] = useState('../assets/images/icon.png');

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(async user => {
  //     if (user) {
  //       const docRef = await db.collection("users").doc(user.providerData[0].uid);
  //       docRef.get().then(function (doc) {
  //         setUserUri(doc.data().basicInfoData.downloadUrl);
  //       }).catch(function (error) {
  //         console.log("Error getting document:", error);
  //       });
  //     } else {
  //       props.navigation.navigate('LoginScreen');
  //     }
  //   })
  // }, []);


  useEffect(() => {
    const docRef = firebase.firestore().collection("users");
    docRef.where('category', '==', 'photographer').get().then(function (querySnapshot) {
      let graphersArr = [];
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        let data = doc.data();
        graphersArr.push(data)
        // console.log(doc.id, " => ", doc.data());
      });
      setGraphers(graphersArr);
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }, []);

  queryGraphersList = async () => {
    // const docRef = await firebase.firestore().collection("users");
    // docRef.where('category', '==', 'photographer').get().then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     // doc.data() is never undefined for query doc snapshots
    //   });
    // }).catch(function (error) {
    //   console.log("Error getting document:", error);
    // });
  }

  // const queryMyBookings = () => {
  //   const docRef = firebase.firestore().collection("bookings");
  //   docRef.where('grapher', '==', 'photographer').get().then(function (querySnapshot) {
  //     let graphersArr = [];
  //     querySnapshot.forEach(function (doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       let data = doc.data();
  //       graphersArr.push(data)
  //       // console.log(doc.id, " => ", doc.data());
  //     });
  //     setGraphers(graphersArr);
  //   }).catch(function (error) {
  //     console.log("Error getting document:", error);
  //   });
  // }

  onRefresh = () => {
    setRefresh(true)
    queryGraphersList();
    setRefresh(false)
  }

  nextScreen = (screen, data) => {
    props.navigation.navigate(screen, {
      grapherData: data
    });
  }

  return (
    <View >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
          />
        }
      >
        <Container style={styles.container}>
          <Header backgroundColor="teal">
            <Left>
              <Button transparent onPress={() => props.navigation.navigate('BookModalScreen')}>
                <Icon name="search" />
                <Text>Book</Text>
              </Button>
            </Left>
            <Right>
              <Thumbnail small source={{ uri: userUri }} />
            </Right>
          </Header>

          {/* <Home nextScreen={nextScreen} graphers={graphers} /> */}
          <GrapherHome navigation={props.navigation} />
        </Container>
      </ScrollView>
    </View>
  );
}

export default HomeScreen

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 5,
    backgroundColor: 'teal',
    marginTop: 22,

  },
  contentContainer: {
    flex: 1,
  }
});
