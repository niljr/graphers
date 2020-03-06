import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native'
import { Button, Text, Input, Item, Icon, Picker, Label, DatePicker } from 'native-base';
import firebase from 'firebase'
import '@firebase/firestore';

const prices = ['1500', '2000', '2500', '3000', '3500', '4000', '4500', '5000'];
const scheduleData = [
    { id: 0, value: 'Sunday' },
    { id: 1, value: 'Monday' },
    { id: 2, value: 'Tuesday' },
    { id: 3, value: 'Wednesday' },
    { id: 4, value: 'Thursday' },
    { id: 5, value: 'Friday' },
    { id: 6, value: 'Saturday' }
]

const BookModalScreen = (props) => {
    const [bookData, setBookData] = useState(props.route.params.filters);

    React.useLayoutEffect(() => {
        const isDisabled = true;

        props.navigation.setOptions({
            headerShown: true,
            headerBackTitle: '',
            headerTitle: 'Choose your Grapher',
            headerRight: () => (
                <Button transparent style={{ paddingRight: 10 }} onPress={handleSubmit} >
                    <Text >Submit</Text>
                </Button>
            ),
        });
    }, [props.navigation, bookData]);

    const handleBookData = (key, data) => {
        const g = {
            ...bookData,
            [key]: data
        };
        setBookData(g);
    }

    const handleSubmit = () => {
        Alert.alert(
            '',
            'Confirm?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Confirm', onPress: () => {
                        props.route.params.queryGraphersList(bookData);

                    }
                },
            ],
            { cancelable: false }
        )


        // props.navigation.navigate('HomeScreen');
    }

    return (
        <View style={styles.container}>
            <Button
                style={styles.button}
                bordered={bookData.category !== 'videographer'}
                onPress={() => handleBookData('category', 'videographer')}>
                <Text style={{ color: bookData.category === 'videographer' ? '#fff' : '#007aff' }}>Videographer</Text>
            </Button>
            <Button
                style={styles.button}
                bordered={bookData.category !== 'photographer'}
                onPress={() => handleBookData('category', 'photographer')}>
                <Text style={{ color: bookData.category === 'photographer' ? '#fff' : '#007aff' }}>Photographer</Text>
            </Button>

            <Text style={styles.title}>Select desired price</Text>
            <Item picker style={styles.wrapper}>
                <Label>Php</Label>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select a price"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={bookData.price}
                    onValueChange={(v) => handleBookData('price', v)}
                >
                    {prices.map(price =>
                        <Picker.Item label={price} value={price} key={price} />
                    )}
                </Picker>
            </Item>

            <Text style={styles.title}>Schedule Date</Text>
            <Item style={styles.wrapper}>
                {bookData.date
                    ? <Label>{scheduleData.find(day => day.id === bookData.date).value}</Label>
                    : null
                }
                <DatePicker
                    // defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Select day"
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={d => handleBookData('date', new Date(d).getDay())}
                />
            </Item>
        </View>
    );
}

export default BookModalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
    },
    button: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        color: '#fff',
    },
    wrapper: {
        width: '70%',
        margin: 25,
        justifyContent: 'center'
    },
});