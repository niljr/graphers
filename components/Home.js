import React from 'react';
import { Image, View, ScrollView, StyleSheet } from 'react-native'
import { Header, Text, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
import Grapher from './Grapher';

const Home = (props) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {props.graphers.map((grapher, key) => <Grapher key={key} data={grapher} nextScreen={props.nextScreen} />)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 5,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flexGrow: 1,
    }
});

export default Home;