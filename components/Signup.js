import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'native-base';
// // import Swiper from 'react-native-swiper'

const Signup = ({ user, handleUserUpdate, handleSave }) => {
    // console.log(user)
    return (
        <View style={styles.container}>
            <Image source={{ uri: user.avatar }} style={styles.logo} />

            <>
                <Text style={styles.title}>What's your Role?</Text>
                <Button
                    style={styles.button}
                    bordered={user.role !== 'client'}
                    onPress={() => handleUserUpdate('role', 'client')}>
                    <Text style={{ color: user.role === 'client' ? '#fff' : '#007aff' }}>Client</Text>
                </Button>
                <Button
                    style={styles.button}
                    bordered={user.role !== 'grapher'}
                    onPress={() => handleUserUpdate('role', 'grapher')}>
                    <Text style={{ color: user.role === 'grapher' ? '#fff' : '#007aff' }}>Grapher</Text>
                </Button>
            </>
            {user.role === 'grapher' && <>
                <Text style={{ ...styles.title, marginTop: 30 }}>Which Grapher are you?</Text>
                <Button
                    style={styles.button}
                    bordered={user.category !== 'videographer'}
                    onPress={() => handleUserUpdate('category', 'videographer')}>
                    <Text style={{ color: user.category === 'videographer' ? '#fff' : '#007aff' }}>Videographer</Text>
                </Button>
                <Button
                    style={styles.button}
                    bordered={user.category !== 'photographer'}
                    onPress={() => handleUserUpdate('category', 'photographer')}>
                    <Text style={{ color: user.category === 'photographer' ? '#fff' : '#007aff' }}>Photographer</Text>
                </Button>
            </>}
        </View>
    );
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    title: {
        textAlign: 'center',
        marginBottom: 15,
    },
    button: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        color: '#fff',
    },
    logo: {
        width: 150,
        height: 150,
        marginVertical: 20,
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
