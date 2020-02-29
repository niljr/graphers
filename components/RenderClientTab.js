import React from 'react'
import { View, } from 'react-native'
import { Tab } from 'native-base'

import BasicInfo from './BasicInfo';
import Portfolio from './Portfolio';

const RenderClientTab = ({ profileData, portfolio_url, handleProfileData, openImagePickerAsync }) => {
    return (
        <div>
            <Tab heading="Schedule">
                <BasicInfo
                    handleProfileData={handleProfileData}
                    profileData={profileData}
                    openImagePickerAsync={openImagePickerAsync} />
            </Tab>
        </div>
    )
}

export default RenderClientTab
