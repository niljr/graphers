import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

const LoadingScreen = props => {

    useEffect(() => {
        checkIfLoggedin();
    }, [])

    checkIfLoggedin = () => {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                const docRef = await firebase.firestore().collection("users").doc(user.providerData[0].uid);
                docRef.get().then(function (doc) {
                    if (doc.data().basicInfoData.role) {
                        props.navigation.navigate('HomeScreen');
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

