import React from 'react'
import { Image, StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';

const GrapherInfo = (props) => {
    const { avatar, firstName, lastName, portfolio_url, rate, category, id } = props.grapherInfo;

    const confirmBooking = () => {
        Alert.alert(
            '',
            'Confirm Booking?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Confirm', onPress: () => props.handleBooking() },
            ],
            { cancelable: false }
        )
    }

    return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Back</Title>
                </Body>
                <Right>
                    <Button transparent onPress={confirmBooking}>
                        <Text>Book</Text>
                    </Button>
                </Right>
            </Header>
            <Content style={styles.container}>
                <Card style={{ flex: 1 }}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: avatar }} />
                            <Body>
                                <Text>{firstName} {lastName}</Text>
                                <Text note>{category}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Image source={{ uri: portfolio_url }} style={{ height: 300, width: '100%', flex: 1 }} />
                            <CardItem>
                                <Icon active name="pin" />
                                <Text>address</Text>
                            </CardItem>
                            <CardItem>
                                <Icon name="cash" />
                                <Text>P 3,000.00</Text>
                            </CardItem>
                        </Body>
                    </CardItem>
                    {/* <CardItem style={styles.details}>
                        <Left>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <Icon name="cash" />
                                <Text>Rate: {rate}</Text>
                            </Button>
                        </Left>
                    </CardItem> */}
                </Card>
            </Content>
        </Container >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 5,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 24
    },
    details: {
        marginTop: 10
    }
});


export default GrapherInfo;
