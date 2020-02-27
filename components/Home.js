import React from 'react';
import { Image } from 'react-native'
import { Header, Text, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';

const Home = () => {
    return (
        <Content>
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: 'Image URL' }} />
                        <Body>
                            <Text>NativeBase</Text>
                            <Text note>GeekyAnts</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{ uri: 'Image URL' }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>12 Likes</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>4 Comments</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Text>11h ago</Text>
                    </Right>
                </CardItem>
            </Card>
        </Content>
    );
}

export default Home;