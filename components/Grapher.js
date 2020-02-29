import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, } from 'native-base';
import GrapherInfo from './GrapherInfo';

const Grapher = (props) => {
    const { avatar, firstName, lastName, portfolio_url, rate, category, id } = props.data;

    // goToGrapherInfo = () => {
    //     props.navigation.navigate('GrapherInfoScreen');
    // }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => props.nextScreen('GrapherInfoScreen', props.data)}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: avatar }} />
                            <Body>
                                <Text>{firstName} {lastName}</Text>
                                <Text note>{category}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{ uri: portfolio_url }} style={{ height: 150, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent>
                                <Icon active name="thumbs-up" />
                                <Text>Rating: 5</Text>
                            </Button>
                        </Left>
                        {/* <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>4 Comments</Text>
                        </Button>
                    </Body> */}
                        <Right>
                            <Text>Rate: {rate}</Text>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        </View>
    )
}
export default Grapher; 
