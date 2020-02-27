import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Tabs, Tab } from 'native-base';

import BasicInfo from './BasicInfo';
import ScheduleInfo from './ScheduleInfo';
import Portfolio from './Portfolio';

const Profile = ({ profileData, handleProfileData, openImagePickerAsync }) => {
    return (
        <Tabs>
            <Tab heading="Basic">
                <BasicInfo
                    handleProfileData={handleProfileData}
                    basicInfoData={profileData.basicInfoData}
                    openImagePickerAsync={openImagePickerAsync} />
            </Tab>
            <Tab heading="Schedule">
                <ScheduleInfo
                    handleProfileData={handleProfileData}
                    scheduleData={profileData.scheduleData} />
            </Tab>
            <Tab heading="Porfolio">
                <Portfolio
                    handleProfileData={handleProfileData}
                    portfolioData={profileData.portfolio}
                    openImagePickerAsync={openImagePickerAsync} />
            </Tab>
        </Tabs>
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 5
    }
});

export default Profile;
