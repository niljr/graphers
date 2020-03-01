import React, { useState, useEffect } from 'react'
import { StyleSheet, View, RefreshControl } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import firebase from 'firebase'
import '@firebase/firestore';

import BasicInfo from './BasicInfo';
import ScheduleInfo from './ScheduleInfo';
import Portfolio from './Portfolio';

import RenderGrapherTab from './RenderGrapherTab';
import RenderClientTab from './RenderClientTab';

const MyBookings = (props) => {
    const [isActive, setIsActive] = useState(1)
    const [clients, setClients] = useState({});
    const [client, setClient] = useState({});
    const [refresh, setRefresh] = useState(false);
    const handleActive = (d) => {
        setIsActive(d)
    }

    const sampleData = {
        data: {
            id: '123456',
            grapher: '111524126288822158617',
            isAprove: false,
            isDone: false,
        }
    }

    useEffect(() => {
        const docRef = firebase.firestore().collection("booking");
        docRef.where('grapher', '==', '111524126288822158617').get().then(function (querySnapshot) {
            let clientsArr = [];
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                let data = doc.data();
                clientsArr.push(data)
                // console.log(doc.id, " => ", doc.data());
            });
            setClients(clientsArr);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }, []);

    const getClientData = (id) => {
        var docRef = db.collection("user").doc(id);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    const queryClientsList = async () => {
        const docRef = firebase.firestore().collection("booking");
        docRef.where('grapher', '==', '111524126288822158617').get().then(function (querySnapshot) {
            let clientsArr = [];
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                let data = doc.data();
                clientsArr.push(data)
                // console.log(doc.id, " => ", doc.data());
            });
            setClients(clientsArr);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }


    onRefresh = () => {
        queryClientsList();
    }

    return (
        <Container>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Content>
                    {/* <List>
                        {clients.map((key, data) => {
                            // console.log(data)
                            // getClientData(data.clientID);
                            return (
                                <ListItem thumbnail key={key}>
                                    <Left>
                                        <Thumbnail square source={{ uri: 'Image URL' }} />
                                    </Left>
                                    <Body>
                                        <Text>Sankhadeep</Text>
                                        <Text note numberOfLines={1}>Status: <Text style={{ color: 'green' }}>{data.isAprove}</Text></Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => props.navigation.navigate('BookingModalScreen')}>
                                            <Text>View</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            )
                        })}
                    </List> */}
                </Content>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 5
    }
});

export default MyBookings;
