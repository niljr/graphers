import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase'
import '@firebase/firestore';

export default function LoginScreen(props) {
    
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    onSignIn = (googleUser) => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                )
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential).then(function (result) {
                    const id = result.user.providerData[0].uid
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    }

    signInWithGoogleAsync = async (route) => {
        try {
            const result = await Google.logInAsync({
                behavior: 'web',
                androidClientId: '1078967101623-lsifqfv1n08alasjph7f97ns7ctsh13a.apps.googleusercontent.com',
                iosClientId: '1078967101623-65i52f4327ojoam19ff7s537t2furdeb.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                if (route === 'login') {
                    onSignIn(result);
                }

                props.navigation.navigate(route === 'login' ? 'HomeScreen' : 'SignupScreen', {
                    user: result.user,
                    result
                });

                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Button title='Log in With Google' onPress={() => signInWithGoogleAsync('login')} />
            </View>
            
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>New to Grapher?</Text>
                <Button
                    title='Sign in With Google'
                    onPress={() => signInWithGoogleAsync('signup')}
                    style={{ fontSize: '10px' }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupContainer: {
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    signupText: {
        color: 'gray'
    }
})