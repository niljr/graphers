import React, { useState, useEffect } from 'react'
import { View, ToastAndroid, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Text, Tabs, Tab, Left, Body, Right, Icon, Spinner } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'
import '@firebase/firestore';
import "firebase/storage"

import Profile from '../components/Profile';
import UploadImage from '../components/UploadImage';

const ProfileScreen = () => {
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [profile, setProfile] = useState({
        id: '',
        firstName: 'Juan',
        lastName: 'Tamad',
        address: 'Iloilo',
        avatar: 'https://i.imgur.com/TkIrScD.png',
        role: '',
        email: '',
        category: '',
        rate: '',
        schedules: [],
        portfolio_url: 'https://i.imgur.com/TkIrScD.png'
    });

    useEffect(() => {
        const fetchData = () => {
            firebase.auth().onAuthStateChanged(async user => {
                if (user) {
                    const docRef = await firebase.firestore().collection("users").doc(user.providerData[0].uid);
                    docRef.get().then(function (doc) {
                        if (doc.exists) {
                            // console.log("Document data:", doc.data());
                            let data = doc.data();
                            setProfile({
                                ...profile,
                                ...data
                            });
                            setUserId(user.providerData[0].uid);
                            setLoading(false);
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });
                } else {
                    console.log('error')
                }
            })
        }
        fetchData()
        setLoading(false)
    }, []);

    openImagePickerAsync = async (key) => {

        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
        });

        if (pickerResult.cancelled === true) {
            return;
        }

        let name = new Date().getTime() + '-media.jpg';
        const generatedId = Math.floor(Math.random() * Math.floor(99999));

        let result = {}

        if (key === 'portfolio') {
            handleProfileData('portfolio_url', pickerResult.uri)
        } else {
            handleProfileData('avatar', pickerResult.uri)
        }
    }

    handleProfileData = (key, data) => {
        setProfile({
            ...profile,
            [key]: data
        });

    }

    handleUpload = async () => {
        setLoading(true);

        const basicDataUrl = await UploadImage(profile.avatar)
        const portfolioDataUrl = await UploadImage(profile.portfolio_url)
        console.log(portfolioDataUrl)
        setProfile({
            ...profile,
            avatar: basicDataUrl.url,

        })
        setProfile({
            ...profile,
            portfolio_url: portfolioDataUrl.url
        })
    };

    handleSave = async (result) => {
        setLoading(true);
        handleUpload();
        Alert.alert(
            '',
            'Confirm Saving?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Confirm', onPress: async () => (
                        await firebase.firestore().collection("users").doc(userId).set({
                            ...profile
                        })
                    )
                },
            ],
            { cancelable: false }
        )
    }

    const logout = () => {
        Alert.alert(
            '',
            'Logout?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Confirm', onPress: () => {
                        firebase.auth().signOut()
                    }
                },
            ],
            { cancelable: false }
        )
    }

    return (
        <Container style={styles.container}>
            <Header transparent style={styles.header}  >
                <Left>
                    <Button transparent onPress={logout}>
                        <Icon name='log-out' />
                    </Button>
                </Left>
                <Right>
                    <Button transparent onPress={handleSave}>
                        {/* <Icon name='save' /> */}
                        <Text>Save</Text>
                    </Button>
                </Right>
            </Header>
            <Content  >
                {setLoading ?
                    <ActivityIndicator
                        style={{
                            flex: 1,
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        size="large"
                    />
                    : null}
                <Profile
                    handleProfileData={handleProfileData}
                    profileData={profile}
                    openImagePickerAsync={openImagePickerAsync} />
                {loading ? <Spinner color='blue' /> : null}
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "teal"
    }
})

export default ProfileScreen;
