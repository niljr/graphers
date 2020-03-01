import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text } from 'native-base';

import BasicInfo from './BasicInfo';
import ScheduleInfo from './ScheduleInfo';
import Portfolio from './Portfolio';

import RenderGrapherTab from './RenderGrapherTab';
import MyBookings from './MyBookings';
import ClientInvites from './ClientInvites';

const GrapherHome = (props) => {
    const [isActive, setIsActive] = useState(1)

    const handleActive = (d) => {
        setIsActive(d)
    }

    return (
        <Container>
            <Segment style={{ backgroundColor: 'teal' }}>
                <Button first active={isActive === 1} onPress={() => handleActive(1)}>
                    <Text>My Bookings</Text>
                </Button>
                <Button last active={isActive === 2} onPress={() => handleActive(2)}>
                    <Text>Client Invites</Text>
                </Button>
            </Segment>
            <Content padder>
                {isActive === 1 ? <MyBookings navigation={props.navigation} /> : <ClientInvites navigation={props.navigation} />}
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 5
    }
});

export default GrapherHome;
