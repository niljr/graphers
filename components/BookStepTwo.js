import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, DatePicker } from 'native-base';

const BookStepTwo = ({ handleBookData }) => {
    const [chosenDate, setChosenDate] = useState(new Date());

    const handleGrapherCategory = (grapher) => {
        handleBookData('category', grapher);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your date</Text>
            <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={setChosenDate()}
                disabled={false}
            />
            <Text>
                Date: {chosenDate.toString().substr(4, 12)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        marginVertical: 20,
        fontSize: 20,

    },
    button: {
        marginVertical: 15,
        justifyContent: 'center',
        paddingHorizontal: 10
    }
})

export default BookStepTwo;