import React from 'react'
import { View, } from 'react-native'
import { Tab } from 'native-base'

import ScheduleInfo from './ScheduleInfo';
import Portfolio from './Portfolio';

const RenderGrapherTab = ({ profileData, handleProfileData, openImagePickerAsync }) => {
    return (
        <View>
            <Tab heading="Schedule">
                <ScheduleInfo
                    handleProfileData={handleProfileData}
                    schedules={profileData.schedules} />
            </Tab>
            <Tab heading="Porfolio">
                <Portfolio
                    handleProfileData={handleProfileData}
                    portfolio_url={profileData.portfolio_url}
                    openImagePickerAsync={openImagePickerAsync} />
            </Tab>
        </View>
    )
}

export default RenderGrapherTab
