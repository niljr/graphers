import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

import BasicInfo from './BasicInfo';
import ScheduleInfo from './ScheduleInfo';
import Portfolio from './Portfolio';

import RenderGrapherTab from './RenderGrapherTab';
import RenderClientTab from './RenderClientTab';

const ClientInfo = () => {
    const [isActive, setIsActive] = useState(1)

    const handleActive = (d) => {
        setIsActive(d)
    }

    return (
        <Container>
            <Content>
                <List>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={{ uri: 'Image URL' }} />
                        </Left>
                        <Body>
                            <Text>Client</Text>
                            <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>View</Text>
                            </Button>
                        </Right>
                    </ListItem>
                </List>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 5
    }
});

export default ClientInfo;
