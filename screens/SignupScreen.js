import React, { useState } from 'react';
import Signup from '../components/Signup';
import { Text } from 'react-native';
import { Button } from 'native-base';
import firebase from 'firebase'

import { connect } from 'react-redux'
import { setUser } from '../redux/modules/user';

const SignupScreen = ({ navigation, route: { params }, dispatch }) => {
    const [user, setUser] = useState({
        id: params.user.id,
        firstName: params.user.givenName,
        lastName: params.user.familyName,
        email: params.user.email,
        avatar: params.user.photoUrl,
        rate: '',
        role: '',
        category: ''
    });

    React.useLayoutEffect(() => {
        const isDisabled = !user.role || user.role === 'grapher' && !user.category;

        navigation.setOptions({
            headerRight: () => (
                <Button transparent style={{ paddingRight: 10 }} disabled={isDisabled} onPress={handleSave}>
                    <Text style={{ color: isDisabled ? 'gray' : 'black' }}>Submit</Text>
                </Button>
            ),
        });
    }, [navigation, user]);

    const handleUserUpdate = (key, value) => {
        let data = user;

        if (key === 'role' && value === 'client') {
            data.category = '';
        }

        setUser({
            ...data,
            [key]: value
        });
    }

    const isUserEqual = (googleUser, firebaseUser) => {
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

    console.log('')
    const handleSave = () => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(params.result, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    params.result.idToken,
                    params.result.accessToken
                )

                firebase.firestore().collection("users").doc(user.id).set({
                    ...user,
                    createdAt: Date.now()
                });

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

            }

            dispatch(setUser(user));

            navigation.navigate('HomeScreen', user);
        });
    }

    return <Signup
        user={user}
        handleUserUpdate={handleUserUpdate}
        handleSave={handleSave} />;
}

export default connect()(SignupScreen);
