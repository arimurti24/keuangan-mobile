import React, { Component } from "react";
import { View, Text, StyleSheet,ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Home } from "../pages/home";
import { Splash } from "../pages/splash";
import { Orders } from "../pages/orders";
import { Account } from "../pages/account";
import { NewIncome } from "../pages/income/NewIncome";
import { NewExpense } from "../pages/expense/NewExpense";
import { Report } from "../pages/report";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//const Tab = createMaterialTopTabNavigator();


export const MainApp = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home';
        } else if (route.name === 'Oders') {
          iconName = focused ? 'cart' : 'cart';
        } else if (route.name === 'Report') {
          iconName = focused ? 'trending-up' : 'trending-up';
        } else if (route.name === 'Account') {
          iconName = focused ? 'settings' : 'settings';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#39ac73',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown:false }} />
      {/* <Tab.Screen name="Oders" component={Orders} options={{ headerShown:false }}/> */}
      <Tab.Screen name="Report" component={Report} options={{ headerShown:false }}/>
      <Tab.Screen name="Account" component={Account} options={{ headerShown:false }}/>
    </Tab.Navigator>
  );
};

class Route extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="MainApp">
       
        {/* <Stack.Screen name="Splash" component={Splash} options={{ headerShown:false }} /> */}
        <Stack.Screen name="NewIncome" component={NewIncome}  options={{ headerShown:false }}/>
        <Stack.Screen name="NewExpense" component={NewExpense}  options={{ headerShown:false }}/>
        <Stack.Screen name="MainApp" component={MainApp}  options={{ headerShown:false }}/>
      </Stack.Navigator>
    );
  }
}

export default Route;
