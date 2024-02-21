import React, { Component, useEffect, useState, useCallback } from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  RefreshControl,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native-paper";

import {
  ApplicationProvider,
  Layout,
  Input,
  Text,
  List,
  ListItem,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import Ionicons from "react-native-vector-icons/Ionicons";

import { History } from "./histroy";
import { Summary } from "./summary";
import { useData } from "../../component/DataContext";

export const Home = ({ navigation }) => {
  const { refreshing, setRefreshing } = useData();

  useEffect(() => {}, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);




  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.banner}>
          <Text style={styles.banner_text}></Text>
        </View>
        <Summary />
        <View style={styles.container_button}>
          <View>
            <Button
              icon="arrow-down-circle"
              buttonColor="#66cc99"
              mode="contained"
              onPress={() => navigation.navigate("NewIncome")}
            >
              Add Income
            </Button>
          </View>
          <View>
            <Button
              icon="arrow-up-circle"
              buttonColor="black"
              mode="contained"
              onPress={() => navigation.navigate("NewExpense")}
            >
              Add Expense
            </Button>
          </View>
        </View>
        <History />
      </ScrollView>
    </ApplicationProvider>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  banner: {
    height: 170,
    backgroundColor: "#8cd9b3",
  },
  container_button: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: windowHight * 0.02,
    marginHorizontal: 40,
    paddingBottom: 6,
    marginBottom: 7,
  },
});
