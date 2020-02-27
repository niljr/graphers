import React, { useState, useEffect } from 'react'
import { View, ToastAndroid } from 'react-native';
import { Container, Header, Content, Button, Text, Tabs, Tab, Left, Body, Right, Icon, Spinner } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'
import '@firebase/firestore';
import "firebase/storage"

import Profile from '../components/Profile';
import UploadImage from '../components/UploadImage';

const ProfileScreen = () => {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [profile, setProfile] = useState({
        basicInfoData: {
            firstName: 'Juan',
            lastName: 'Tamad',
            address: 'Iloilo',
            uri: 'https://i.imgur.com/TkIrScD.png',
            downloadUrl: 'https://i.imgur.com/TkIrScD.png',
            role: '',
            email: '',
            rate: '3000'
        },
        scheduleData: [
            { id: 1, value: 'Monday', isChecked: false },
            { id: 2, value: 'Tuesday', isChecked: false },
            { id: 3, value: 'Wednesday', isChecked: false },
            { id: 4, value: 'Thursday', isChecked: false },
            { id: 5, value: 'Friday', isChecked: false },
            { id: 6, value: 'Saturday', isChecked: false },
            { id: 7, value: 'Sunday', isChecked: false }
        ],
        portfolio: {
            id: '',
            base64: '',
            name: '',
            uri: 'https://i.imgur.com/TkIrScD.png',
            downloadUrl: 'https://i.imgur.com/TkIrScD.png'
        }

    });

    useEffect(() => {
        setLoading(true);
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
    }, []);

    openImagePickerAsync = async (key) => {

        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            // allowsEditing: true,
            base64: true,
            aspect: [4, 3]
        });

        if (pickerResult.cancelled === true) {
            return;
        }

        let name = new Date().getTime() + '-media.jpg';
        const generatedId = Math.floor(Math.random() * Math.floor(99999));

        let result = {}

        if (key === 'portfolio') {
            result = {
                id: generatedId,
                name: name,
                downloadUrl: pickerResult.uri,
            }
        } else {
            result = {
                ...profile.basicInfoData,
                downloadUrl: pickerResult.uri
            };
        }

        handleProfileData(key, result)
    }

    handleProfileData = (key, data) => {
        setProfile({
            ...profile,
            [key]: data
        });

    }

    handleUpload = async () => {
        setLoading(true);

        const basicDataUrl = await UploadImage(profile.basicInfoData)
        const portfolioDataUrl = await UploadImage(profile.portfolio)
        console.log('1')
        setProfile({
            ...profile,
            basicInfoData: {
                ...profile.basicData,
                downloadUrl: basicDataUrl.url
            },
            portfolio: {
                ...profile.portfolio,
                downloadUrl: portfolioDataUrl.url
            }
        })
        console.log('2')
        // const data = await UploadImage(profile.portfolio)
    };

    handleSave = async (result) => {

        setLoading(true);
        handleUpload();
        console.log('3')
        try {
            await firebase.firestore().collection("users").doc(userId).set({
                ...profile
            })
            console.log('4')
            ToastAndroid.showWithGravityAndOffset(
                'Successfully Saved!',
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50
            );
        } catch (err) {
            console.log(err)
            console.log('5')
        }
        console.log('6')
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
