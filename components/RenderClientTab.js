import React from 'react'
import { View, } from 'react-native'
import { Tab } from 'native-base'

import BasicInfo from './BasicInfo';
import Portfolio from './Portfolio';

const RenderClientTab = ({ profileData, portfolio_url, handleProfileData, openImagePickerAsync }) => {
    return (
        <View>
            <Tab heading="BasicInfo">
                <BasicInfo
                    handleProfileData={handleProfileData}
                    profileData={profileData}
                    openImagePickerAsync={openImagePickerAsync} />
            </Tab>
        </View>
    )
}

export default RenderClientTab
