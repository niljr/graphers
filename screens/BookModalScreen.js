import React, { useState } from 'react';
import { View } from 'react-native'
import { Button, Text } from 'native-base';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import BookStepOne from '../components/BookStepOne'
import BookStepTwo from '../components/BookStepTwo'

const BookModalScreen = ({ navigation }) => {

    const [bookData, setBookData] = useState({});

    const handleBookData = (key, data) => {
        setBookData({
            ...bookData,
            [key]: data
        })
        console.log(bookData)
    }

    return (
        <View style={{ flex: 1 }}>
            <ProgressSteps>
                <ProgressStep label="First Step">
                    <View style={{ alignItems: 'center' }}>
                        <BookStepOne handleBookData={handleBookData} />
                    </View>
                </ProgressStep>
                <ProgressStep label="Second Step">
                    <View style={{ alignItems: 'center' }}>
                        <BookStepTwo handleBookData={handleBookData} />
                    </View>
                </ProgressStep>
                <ProgressStep label="Third Step">
                    <View style={{ alignItems: 'center' }}>
                        <Text>This is the content within step 3!</Text>
                    </View>
                </ProgressStep>
            </ProgressSteps>
        </View>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        //     <Button onPress={() => navigation.goBack()} title="Dismiss" />
        // </View>
    );
}

export default BookModalScreen; 
