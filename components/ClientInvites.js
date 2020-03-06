import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import firebase from 'firebase'
import '@firebase/firestore';

const ClientInvites = (props) => {
    const [client, setClient] = useState({
        id: '1',
        avatar: '',
        firstName: '',
        isActive: false
    })
    const [clientStatus, setClientStatus] = useState(false);

    useEffect(() => {
        if (props.client.clientId) {
            queryClientInfo(props.client.clientId);
            setClientStatus(props.client)
        }
    }, [])

    const queryClientInfo = async (id) => {
        if (id) {
            const info = await firebase.firestore().collection('users').doc(id.toString(8))
                .get().then((doc) => {
                    const d = doc.data();
                    setClient(d);
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
            return info
        } else {
            return;
        }
    }

    return (
        <List>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: client.avatar ? client.avatar : '' }} />
                </Left>
                <Body>
                    <Text>{`${client.firstName} ${client.lastName}`}</Text>
                    <Text note numberOfLines={1}>Status: <Text style={{ color: 'green' }}>{clientStatus.isApprove ? 'Approve' : 'Pending'}</Text></Text>
                </Body>
                <Right>
                    <Button bordered onPress={() => props.navigation.navigate('BookingModalScreen', {
                        client,
                        clientStatus
                    })}>
                        <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
        </List>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 5
    }
});

export default ClientInvites;
