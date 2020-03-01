import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import firebase from 'firebase'
import '@firebase/firestore';

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
                    if (doc.data().role) {
                        props.navigation.navigate('HomeScreen', {
                            uri: doc.data().avatar
                        });
                    } else {
                        props.navigation.navigate('UserRoleScreen');
                    }
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
export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

