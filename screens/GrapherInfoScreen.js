import React, { useState, useEffect } from 'react'
import { View, Image, ToastAndroid } from 'react-native';
import firebase from 'firebase'
import '@firebase/firestore';

import GrapherInfo from '../components/GrapherInfo';

const GrapherInfoScreen = (props) => {
    const [grapherInfo, setGrapherInfo] = useState({});
    const [clientId, setClientId] = useState(null);

    useEffect(() => {
        setGrapherInfo(props.route.params.grapherData)
    }, [])

    console.log('grapherInfo', grapherInfo)

    const handleBooking = async () => {
        let bookingId = await new Date().getTime();

        await firebase.auth().onAuthStateChanged(async user => setClientId(user.providerData[0].uid));

        try {
            await firebase.firestore().collection("booking").doc(bookingId.toString(8)).set({
                grapher: grapherInfo.id,
                clientId: clientId,
                isApprove: false,
                isDone: false,
                id: bookingId.toString(8),
                budget: grapherInfo.rate
            })
            ToastAndroid.showWithGravityAndOffset(
                'Successfully Saved!',
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50
            );
        } catch (err) {
            console.log(err)
        }


    }

    return (
        <View style={{ flex: 1 }}>
            <GrapherInfo grapherInfo={grapherInfo} handleBooking={handleBooking} navigation={props.navigation} />
        </View>
    )
}

export default GrapherInfoScreen; 