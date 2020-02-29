import React, { useState } from 'react';
import { StyleSheet, View, Modal, TouchableHighlight } from 'react-native';
import { Button, Text } from 'native-base'
import firebase from 'firebase'
import '@firebase/firestore';

const UserRoleScreen = (props) => {
    const [modalCategory, setModalCategory] = useState(false);
    const [category, setCategory] = useState('');
    const { email, id, givenName, familyName, photoUrl } = props.route.params.user;

    userRole = async (role) => {
        const docRef = await firebase.firestore().collection("users").doc(id);
        docRef.get().then((doc) => {
            if (doc.data().role) {
                props.navigation.navigate('HomeScreen');
            } else {
                firebase.firestore().collection("users").doc(id).set({
                    id,
                    firstName: givenName,
                    lastName: familyName,
                    email: email,
                    avatar: photoUrl,
                    rate: '',
                    role,
                    category,
                    createdAt: Date.now()
                })

                // doc.data() will be undefined in this case
                // props.navigation.navigate('UserRoleScreen');
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    handleData = async (d) => {
        await setCategory(d)
        userRole('grapher');
        setModalCategory(false);
        props.navigation.navigate('HomeScreen', {
            uri: photoUrl
        });
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalCategory}>
                <View style={styles.container}>
                    <Text>Choose your Category!</Text>
                    <Button
                        style={styles.button}
                        rounded
                        primary
                        onPress={() => {
                            handleData('photographer')
                        }}>
                        <Text>Photopgraher</Text>
                    </Button>
                    <Button
                        style={styles.button}
                        rounded
                        primary
                        onPress={() => {
                            handleData('videographer')
                        }}>
                        <Text>Videographer</Text>
                    </Button>
                    <Button transfparent onPress={() => setModalCategory(false)}>
                        <Text>Back</Text>
                    </Button>
                </View>
            </Modal>
            <Text style={styles.title}>What's your Role?</Text>
            <Button style={styles.button} onPress={() => userRole('client')}>
                <Text>Client</Text>
            </Button>
            <Button style={styles.button} onPress={() => setModalCategory(true)}>
                <Text>Grapher</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        marginBottom: 15,
    },
    button: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        color: '#fff',
    },
});

export default UserRoleScreen;