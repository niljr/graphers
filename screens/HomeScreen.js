import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Right, Icon, Button, Left, Thumbnail } from 'native-base';
import * as WebBrowser from 'expo-web-browser';
import firebase from 'firebase'
import '@firebase/firestore';
import { connect } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import { MonoText } from '../components/StyledText';
import Home from '../components/Home';
import GrapherHome from '../components/GrapherHome';


const HomeScreen = (props) => {
  const [refresh, setRefresh] = useState(false);
  const [isBook, setIsBook] = useState(false);
  const [graphers, setGraphers] = useState([]);
  const [clients, setClients] = useState([]);
  const [filters, setFilter] = useState({
    category: '',
    price: '',
    date: null
  });
  const [currentUser, setCurrentUser] = useState({
    ...props.route.params
  });
  const [userUri, setUserUri] = useState('../assets/images/icon.png');
  const route = useRoute();

  useEffect(() => {
    queryClientsList();
    queryAllGrapheres()

  }, []);

  const queryAllGrapheres = () => {
    const docRef = firebase.firestore().collection("users");
    docRef.where('category', 'in', ['photographer', 'videographer']).get().then(function (querySnapshot) {
      let graphersArr = [];
      querySnapshot.forEach(function (doc) {
        let data = doc.data();
        graphersArr.push(data)
      });
      setGraphers(graphersArr);
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }


  const queryGraphersList = (data) => {
    setFilter(data);
  }

  const queryClientsList = () => {
    const docRef = firebase.firestore().collection("booking");
    docRef.where('grapher', '==', props.user.id).get().then(function (querySnapshot) {
      let clientsArr = [];
      querySnapshot.forEach(function (doc) {
        let data = doc.data();
        clientsArr.push(data)
      });
      setClients(clientsArr);
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  const queryClientInfo = async (id) => {
    if (id) {
      const info = await firebase.firestore().collection('users').doc(id.toString(8))
        .get().then((doc) => {
          const d = doc.data();
          return d;
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
      return info
    } else {
      return;
    }
  }

  const onRefresh = () => {
    setRefresh(true)
    queryAllGrapheres();
    setRefresh(false)
  }

  nextScreen = (screen, data) => {
    props.navigation.navigate(screen, {
      grapherData: data
    });
  }

  const grapherList = (
    (filters.category || filters.price || filters.date)
      ? graphers.filter(g => (
        g.category === filters.category ||
        g.rate < filters.price ||
        (filters.date && g.schedules.includes(filters.date))))
      : graphers
  )

  console.log('--', props)
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
          <Header transparent>
            {
              props.user.role !== 'grapher' ? <Left>
                <Button transparent onPress={() => props.navigation.navigate('BookModalScreen', {
                  queryGraphersList,
                  filters
                })}>
                  <Icon name="funnel" />
                  <Text style={{ color: 'white', paddingLeft: 10 }}>Filter  </Text>
                </Button>
              </Left> : null
            }

            <Right>
              <Text style={{ color: '#fff', paddingVertical: 10, paddingRight: 10 }}>Hi, {props.user.firstName}</Text>
              <Thumbnail small source={{ uri: props.user.avatar ? props.user.avatar : props.user.photoUrl }} />
            </Right>
          </Header>

          {props.user.role === 'client' ? <Home nextScreen={nextScreen} graphers={grapherList} queryClientInfo={queryClientInfo} />
            : <GrapherHome navigation={props.navigation} clientsData={clients} queryClientInfo={queryClientInfo} />}
        </Container>
      </ScrollView>
    </View>
  );
}

function mapStateToProps({ user }) {
  return {
    user: user.user
  }
}
export default connect(mapStateToProps)(HomeScreen);

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 5,
    backgroundColor: 'teal',
    // marginTop: 22,

  },
  contentContainer: {
    flex: 1,
  }
});
