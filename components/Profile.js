import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Content, Tabs, Tab } from 'native-base';

import BasicInfo from './BasicInfo';
import ScheduleInfo from './ScheduleInfo';
import Portfolio from './Portfolio';

import RenderGrapherTab from './RenderGrapherTab';
import RenderClientTab from './RenderClientTab';

const Profile = ({ profileData, handleProfileData, openImagePickerAsync }) => {

    return (
        <Tabs>
            <Tab heading="Basic">
                <BasicInfo
                    handleProfileData={handleProfileData}
                    profileData={profileData}
                    openImagePickerAsync={openImagePickerAsync} />
                {
                    profileData.role === 'client' ?
                        <RenderClientTab
                            handleProfileData={handleProfileData}
                            profileData={profileData}
                            openImagePickerAsync={openImagePickerAsync} />
                        :
                        <RenderGrapherTab
                            handleProfileData={handleProfileData}
                            profileData={profileData}
                            openImagePickerAsync={openImagePickerAsync} />
                }

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
