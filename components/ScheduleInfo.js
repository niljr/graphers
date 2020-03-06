import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, CheckBox, Text, Body, Button } from 'native-base';

const ScheduleInfo = ({ schedules, handleProfileData }) => {
    const isChecked = (id) => (schedules.includes(id));

    const scheduleData = [
        { id: 0, value: 'Sunday' },
        { id: 1, value: 'Monday' },
        { id: 2, value: 'Tuesday' },
        { id: 3, value: 'Wednesday' },
        { id: 4, value: 'Thursday' },
        { id: 5, value: 'Friday' },
        { id: 6, value: 'Saturday' }
    ],

        handleChange = id => {

            let selected = schedules;

            if (isChecked(id)) {
                const index = selected.findIndex(item => item === id);
                selected.splice(index, 1);
            } else {
                selected.push(id)
            }

            handleProfileData('schedules', selected);

        }

    return (
        <View style={{ justifyContent: 'center', flex: 1, marginHorizontal: 10, textAlign: 'center' }}>
            <Text style={styles.title}>
                Schedule
            </Text>
            {
                scheduleData.map((day, key) => (
                    <ListItem key={day.id} >
                        <CheckBox checked={isChecked(day.id)} onPress={() => handleChange(day.id)} />
                        <Body>
                            <Text>{day.value}</Text>
                        </Body>
                    </ListItem>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 10
    },
})

export default ScheduleInfo;
