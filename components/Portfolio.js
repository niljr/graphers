import React, { useState, useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Input, Item, Form, Label } from 'native-base';

import GalleryList from './GalleryList';

const Portfolio = ({ handleProfileData, portfolioData, openImagePickerAsync }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: portfolioData.downloadUrl }} style={styles.logo} />
            <Text style={styles.instructions}>
                To share a photo from your phone with a friend, just press the button below!
            </Text>

            <TouchableOpacity onPress={() => openImagePickerAsync('portfolio')} style={styles.button}>
                <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>

            {/* {
                portfolioData.map((img, key) => (
                    <GalleryList
                        key={key}
                        imgData={img}
                        style={styles.galleryList} />
                )
                )
            } */}

        </View>
    );
}

export default Portfolio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        flex: 1 * 0.5,
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});
