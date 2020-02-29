import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';

const BookStepOne = ({ handleBookData }) => {
    const [isActive, SetisActive] = useState(false)

    const handleGrapherCategory = (grapher) => {
        handleBookData('category', grapher);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose your Grapher</Text>
            <Button
                onPress={() => handleGrapherCategory('photographer')}
                style={styles.button}
                large
                rounded>
                <Text>Photographer</Text>
            </Button>
            <Button
                onPress={() => handleGrapherCategory('videographer')}
                style={styles.button}
                large
                rounded
                rounded>
                <Text>Videographer</Text>
            </Button>
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

export default BookStepOne;