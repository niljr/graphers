import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native'
import { Button, Text, Form, Item, Label, Icon, Picker } from 'native-base';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import BookStepOne from '../components/BookStepOne'
import BookStepTwo from '../components/BookStepTwo'

const BookingModalScreen = ({ navigation }) => {

    const [bookData, setBookData] = useState({});
    const [selected, setSelected] = useState('active')

    const handleBookData = (key, data) => {
        setBookData({
            ...bookData,
            [key]: data
        })
    }


    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Form style={styles.container} >
                <Text style={styles.title}>
                    STATUS: <Text style={{ color: selected === 'ACTIVE' ? 'green' : 'red' }}>{selected}</Text>
                </Text>

                <Picker
                    note
                    mode="dropdown"
                    style={{ width: 120 }}
                    selectedValue={selected}
                    placeholder="Status"
                    onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
                >
                    <Picker.Item label="Active" value="ACTIVE" />
                    <Picker.Item label="Inactive" value="INACTIVE" />
                </Picker>

                <Image source={{ uri: 'https://lh3.googleusercontent.com/a-/AOh14Gixg1xxoejKtbqQKX68XeBEA_U7n48WqtZykgrFxQ' }} style={styles.logo} />

                <Item floatingLabel style={styles.item}>
                    <Label>Name:Juan Tamad </Label>
                </Item>
                <Item floatingLabel style={styles.item}>
                    <Label>Address: Tapaz Iloilo</Label>
                </Item>
                <Item floatingLabel style={styles.item}>
                    <Label>Contact Number: 09999999</Label>
                </Item>
                <Item floatingLabel style={styles.item}>
                    <Label>Price: P3,000.00</Label>
                </Item>
                <Button block dark style={styles.buttonBack} onPress={() => navigation.goBack()}>
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
