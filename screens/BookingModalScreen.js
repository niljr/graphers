import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native'
import { Button, Text, Form, Item, Label, Icon, Picker } from 'native-base';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import firebase from 'firebase'
import '@firebase/firestore';

import BookStepOne from '../components/BookStepOne'
import BookStepTwo from '../components/BookStepTwo'

const BookingModalScreen = (props) => {

    const [bookData, setBookData] = useState({});
    const [selected, setSelected] = useState('active');
    const [clientInfo, setClientInfo] = useState({
        ...props.route.params.client
    });
    const [clientStatus, setClientStatus] = useState({
        ...props.route.params.clientStatus
    });

    const handleBookData = (key, data) => {
        setBookData({
            ...bookData,
            [key]: data
        })
    }

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

    const updateStatus = (itemValue) => {
        const info = firebase.firestore().collection('booking').doc(clientStatus.id.toString(8)).update({ isApprove: itemValue })
        setSelected(itemValue);
    }


    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Form style={styles.container} >
                <Text style={styles.title}>
                    STATUS: <Text style={{ color: selected === true ? 'green' : 'red' }}>{selected ? 'Approved' : 'Pending'}</Text>
                </Text>

                <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    selectedValue={selected}
                    placeholder="Status"
                    onValueChange={(itemValue, itemIndex) => updateStatus(itemValue)}
                >
                    <Picker.Item label="Active" value={true} />
                    <Picker.Item label="Pending" value={false} />
                </Picker>

                <Image source={{ uri: clientInfo.avatar }} style={styles.logo} />

                <Item floatingLabel style={styles.item}>
                    <Label>Name:{`${clientInfo.firstName} ${clientInfo.lastName}`} </Label>
                </Item>
                <Item floatingLabel style={styles.item}>
                    <Label>Email: {clientInfo.email}</Label>
                </Item>
                <Item floatingLabel style={styles.item}>
                    <Label>Contact Number: 09999999</Label>
                </Item>
                <Item floatingLabel style={styles.item}>
                    <Label>Price: {clientStatus.budget}</Label>
                </Item>
                <Button block dark style={styles.buttonBack} onPress={() => props.navigation.goBack()}>
                    <Icon name='arrow-back' /><Text>Go back</Text>
                </Button>
            </Form>
        </ScrollView>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        //     <Button onPress={() => navigation.goBack()} title="Dismiss" />
        // </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: 'teal',
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
        marginHorizontal: 70,
        marginVertical: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    item: {
        marginVertical: 5
    },
    input: {
        marginVertical: 1,
        marginHorizontal: 15,
    },
    logo: {
        width: 150,
        height: 150,
        marginVertical: 20,
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'teal',
        fontSize: 18,
        marginHorizontal: 15,
        textAlign: 'center'
    },
    titleSub: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonBack: {
        // backgroundColor: ''
        marginTop: 20
    }
});

export default BookingModalScreen; 
