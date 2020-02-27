import React from 'react'
import { StyleSheet, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Input, Item, Form, Button } from 'native-base';

const BasicInfo = ({ handleProfileData, basicInfoData, openImagePickerAsync }) => {
    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Form style={styles.container} >
                <Image source={{ uri: basicInfoData.downloadUrl }} style={styles.logo} />
                <Text style={styles.instructions}>
                    Upload your Avatar
                    </Text>

                <Button onPress={() => openImagePickerAsync('basicInfoData')} style={styles.button}>
                    <Text style={styles.buttonText}>Pick a photo</Text>
                </Button>

                <Item rounded style={styles.item}>
                    <Input
                        onChangeText={(firstName) => handleProfileData('basicInfoData', { ...basicInfoData, firstName })}
                        placeholder='First Name'
                        style={styles.input}
                        value={basicInfoData.firstName} />
                </Item>
                <Item rounded style={styles.item}>
                    <Input
                        onChangeText={(lastName) => handleProfileData('basicInfoData', { ...basicInfoData, lastName })}
                        placeholder='Last Name'
                        style={styles.input}
                        value={basicInfoData.lastName}
                    />
                </Item>
                <Item rounded style={styles.item}>
                    <Input
                        onChangeText={(address) => handleProfileData('basicInfoData', { ...basicInfoData, address })}
                        placeholder='Address'
                        style={styles.input}
                        value={basicInfoData.address}
                    />
                </Item>
                <Item rounded style={styles.item}>
                    <Input
                        onChangeText={(rate) => handleProfileData('basicInfoData', { ...basicInfoData, rate })}
                        placeholder='Rate'
                        style={styles.input}
                        type='number'
                        value={basicInfoData.rate}
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

