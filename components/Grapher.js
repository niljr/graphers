import React from 'react';
import { View, Image, StyleSheet } from 'react-native'
import { ListItem, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, } from 'native-base';
import GrapherInfo from './GrapherInfo';

const Grapher = (props) => {
    const { avatar, firstName, lastName, portfolio_url, rate, category, id } = props.data;

    // goToGrapherInfo = () => {
    //     props.navigation.navigate('GrapherInfoScreen');
    // }

    return (
        <View style={{ flex: 1 }}>
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: avatar }} />
                </Left>
                <Body>
                    <Text>{firstName} {lastName}</Text>
                    <Text note numberOfLines={1}>{category}</Text>
                    <Text style={styles.rate}>₱ {rate.toFixed(3)}</Text>
                </Body>
                <Right>
                    <Button bordered style={styles.button} onPress={() => props.nextScreen('GrapherInfoScreen', props.data)}>
                        {/* <Icon name='md-eye' style={{ fontSize: 20, color: 'teal' }} /> */}
                        <Text style={styles.view}>View</Text>
                    </Button>
                </Right>
            </ListItem>
        </View>
    )
}

const styles = StyleSheet.create({
    rate: {
        color: 'red',
        fontStyle: 'italic'
    },
    button: {
        borderColor: 'teal'
    },
    view: {
        color: 'teal'
    }
})
export default Grapher; 
