import React, { } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet,ScrollView,Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { AllTime } from './all-time';

const Tab = createMaterialTopTabNavigator();
import { Orders } from '../orders';

export const Report = () => {

    return (
        <Tab.Navigator style={styles.tab}       
        screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { backgroundColor: 'white' },
          }}
          >
        <Tab.Screen name="All Time" component={AllTime} />
        <Tab.Screen name="Orders" component={Orders} />
      </Tab.Navigator>
    )
  
}

const windowWidth = Dimensions.get("window").width;
const windowHight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    tab : {
        marginTop: windowHight * 0.05,
    }
});



