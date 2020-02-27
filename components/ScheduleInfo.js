import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { ListItem, CheckBox, Text, Body, Button } from 'native-base';

const ScheduleInfo = (props) => {

    handleChange = id => {

        const changedCheckBox = props.scheduleData.find((cb) => cb.id === id);

        changedCheckBox.isChecked = !changedCheckBox.isChecked;

        const checkboxes = Object.assign(props.scheduleData, changedCheckBox);

        props.handleProfileData('scheduleData', checkboxes);

    }
    return (
        <View>
            {
                props.scheduleData.map((day, key) => (
                    <ListItem key={day.id} >
                        <CheckBox checked={day.isChecked} onPress={() => handleChange(day.id)} />
                        <Body>
                            <Text>{day.value}</Text>
                        </Body>
                    </ListItem>
                )
                )
            }
        </View>
    )
}

export default ScheduleInfo;
