import React from 'react'
import { Image, StyleSheet, Alert, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';

const GrapherInfo = (props) => {
    const { avatar, firstName, lastName, portfolio_url, rate, category, id, schedules } = props.grapherInfo;
    const scheduleData = [
        { id: 0, value: 'Sunday' },
        { id: 1, value: 'Monday' },
        { id: 2, value: 'Tuesday' },
        { id: 3, value: 'Wednesday' },
        { id: 4, value: 'Thursday' },
        { id: 5, value: 'Friday' },
        { id: 6, value: 'Saturday' }
    ]

    const confirmBooking = () => {
        Alert.alert(
            '',
            'Confirm Booking?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Confirm', onPress: () => {
                        props.handleBooking()
                        props.navigation.goBack();
                    }
                },
            ],
            { cancelable: false }
        )
    }
    console.log(schedules)
    // console.log('schedules', scheduleData.filter(sched => schedules.indexOf(sched.id) > 0))

    // const availablDays = scheduleData.filter(sched => schedules.indexOf(sched.id) >= 0)

    return (
        <Container style={styles.container}>
            <Header transparent style={styles.header}>
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
                                {
                                    // availablDays.map((day, key) => {
                                    //     <View key={key}>
                                    //         <Text>day.value</Text>
                                    //     </View>
                                    // })
                                }
                            </CardItem>

                            {schedules
                                ? <CardItem style={{ paddingBottom: 0 }}>
                                    {scheduleData
                                        .filter(d => schedules.includes(d.id))
                                        .map((item, i) => <Text>{item.value}{i === schedules.length - 1 ? '' : ' | '}</Text>)}
                                </CardItem>
                                : null
                            }

                            <CardItem style={{ paddingTop: 0 }}>
                                <Text>RATES: </Text><Text style={styles.rate}>₱ {rate}</Text>
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
        // marginTop: 24,
        backgroundColor: 'teal'
    },
    details: {
        marginTop: 10
    },
    rate: {
        fontSize: 20,
        color: 'red',
        fontStyle: 'italic'
    },
});


export default GrapherInfo;
