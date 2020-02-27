import React from 'react'
import firebase from 'firebase'
import '@firebase/firestore';
import "firebase/storage"

// firebase.initializeApp(Config);
// const db = firebase.firestore()

const UploadImage = async (props) => {

    let { name, lastName, uri } = props

    name = lastName ? lastName : name;
    const id = new Date().getTime();
    const response = await fetch(uri);
    const blob = await response.blob();

    var metadata = {
        contentType: 'image/jpeg'
    };

    const ref = await firebase.storage().ref().child(`images/user/${lastName ? 'avatar' : 'portfolio'}/${name}`);
    await ref.put(blob, metadata);
    let data = {
        id: '',
        url: '',
    };
    data.url = await ref.getDownloadURL();

    const ref2 = await firebase.firestore().collection("assets").add({
        type: `${lastName ? 'avatar' : 'portfolio'}`,
        URL: data.url,
        //'thumb': _imageData['thumb'],
        name: name,
        //'coords': _imageData['coords'],
        //   'owner': firebase.auth().currentUser && firebase.auth().currentUser.uid,
        when: new Date().getTime()
    });

    data.id = await ref2.id;

    return data;
}

export default UploadImage