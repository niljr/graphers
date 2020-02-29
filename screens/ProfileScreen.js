import React, { useState, useEffect } from 'react'
import { View, ToastAndroid, ActivityIndicator } from 'react-native';
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
            // allowsEditing: true,
            // base64: true,
            // aspect: [4, 3]
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
        // const data = await UploadImage(profile.portfolio)
    };

    handleSave = async (result) => {

        setLoading(true);
        handleUpload();
        try {
            await firebase.firestore().collection("users").doc(userId).set({
                ...profile
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
        setLoading(false);
    }

    return (
        <View style={{ flex: 1 }}>
            <Container >
                <Header style={{ marginTop: 24 }}>
                    <Left>
                        <Button transparent onPress={() => firebase.auth().signOut()}>
                            <Icon name='log-out' />
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent onPress={handleSave}>
                            <Icon name='save' />
                            <Text>Save</Text>
                        </Button>
                    </Right>
                </Header>
                <Content >
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
        </View >
    )
}


export default ProfileScreen;
