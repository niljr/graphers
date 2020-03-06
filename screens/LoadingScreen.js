import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import firebase from 'firebase'
import '@firebase/firestore';
import { connect } from 'react-redux'
import { setUser } from '../redux/modules/user';

const LoadingScreen = props => {

    useEffect(() => {
        checkIfLoggedin();
        // props.navigation.navigate('HomeScreen');
    }, [])
    const checkIfLoggedin = async () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const docRef = firebase.firestore().collection("users").doc(user.providerData[0].uid);
                docRef.get().then(function (doc) {
                    props.dispatch(setUser(doc.data()));

                    setTimeout(() => {
                        props.navigation.navigate('HomeScreen');
                    }, 300);
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
            } else {
                props.navigation.navigate('LoginScreen');
            }
        })
    }
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    )
}
export default connect()(LoadingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

