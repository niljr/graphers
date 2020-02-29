import React from 'react'
import { StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Input, Item, Form, Button } from 'native-base';

const BasicInfo = ({ handleProfileData, profileData, openImagePickerAsync }) => {
    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Form style={styles.container} >
                <Image source={{ uri: profileData.avatar }} style={styles.logo} />
                <Text style={styles.instructions}>
                    Upload your Avatar
                    </Text>

                <Button onPress={() => openImagePickerAsync('avatar')} style={styles.button}>
                    <Text style={styles.buttonText}>Pick a photo</Text>
                </Button>

                <Item rounded style={styles.item}>
                    <Input
                        onChangeText={(firstName) => handleProfileData('firstName', { ...profileData, firstName })}
                        placeholder='First Name'
                        style={styles.input}
                        value={profileData.firstName} />
                </Item>
                <Item rounded style={styles.item}>
                    <Input
                        onChangeText={(lastName) => handleProfileData('lastName', { ...profileData, lastName })}
                        placeholder='Last Name'
                        style={styles.input}
                        value={profileData.lastName}
                    />
                </Item>
                <Item rounded style={styles.item}>
                    <Input
                        onChangeText={(address) => handleProfileData('address', { ...profileData, address })}
                        placeholder='Address'
                        style={styles.input}
                        value={profileData.address}
                    />
                </Item>
                <Item rounded style={styles.item}>
                    <Input
                        onChangeText={(rate) => handleProfileData('rate', { ...profileData, rate })}
                        placeholder='Rate'
                        style={styles.input}
                        type='number'
                        value={profileData.rate}
                    />
                </Item>
            </Form>
        </ScrollView>
    )
};

export default BasicInfo;

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 10
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
        marginHorizontal: 70,
        marginVertical: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    item: {
        marginVertical: 5
    },
    input: {
        marginVertical: 1,
        marginHorizontal: 15,
    },
    logo: {
        width: 150,
        height: 150,
        marginVertical: 20,
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
        textAlign: 'center'
    },
});

