import { Layout } from "@ui-kitten/components";
import React, { useState, useEffect,useCallback } from "react";
import { View,TouchableOpacity,SafeAreaView } from "react-native";
import axios from "axios";

import {
  ApplicationProvider,
  Input,
  Text,
  ListItem,
  Button,
} from "@ui-kitten/components";
import { List } from "react-native-paper";
import { StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useData } from "../../component/DataContext";
import formatCurrency from "../../component/FormatCurrency";
export const History = ({ navigation }) => {
  const { dataTransaction, updateDataTransaction } = useData();
  const { refreshing, setRefreshing } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const fetchData = async () => {

    setIsLoading(true);

    try {
      const response = await axios.get(
        "https://app.kelasprogrammer.com/keuangan-laravel/public/api/transaction"
      );
      setData(response.data);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // console.log(data);
  }, [dataTransaction,refreshing]);



  return (

    <View>
        {isLoading ? ( // Check if data is loading
        <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator
      ) : (
      <View>
      {data.map((row, index) => (
        <Layout style={styles.container} key={index}>
          <View style={styles.header_awal}>
            <View style={styles.tanggal}>
              <View style={styles.tanggal_detail}>
                <Ionicons
                  name="calendar-outline"
                  style={styles.icon}
                  size={25}
                  color="black"
                />
                
                <Text style={styles.label_tanggal}>{row.date.split("-")[2]}</Text>
              </View>
              <Text style={styles.label_tanggal_detail}>Feb 2024</Text>
            </View>
            <View style={styles.header}>
              <View style={styles.header_style}>
                <Text style={styles.label_header}>Income</Text>
                <Text style={styles.income}>{formatCurrency(row.total_income)}</Text>
              </View>
              <View style={styles.header_style}>
                <Text style={styles.label_header}>Expense</Text>
                <Text style={styles.expense}>{formatCurrency(row.total_expense)}</Text>
              </View>
              <View style={styles.header_style}>
                <Text style={styles.label_header}>Balance</Text>
                <Text   style={[
                styles.balances,
                row.balance <= 0 ? styles.redText : styles.normalText,
              ]}>{formatCurrency(row.balance)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.header_deskripsi}>
            <View>
              <Text style={styles.font_header_deskripsi}>Description</Text>
            </View>
            <View>
              <Text style={styles.font_header_deskripsi}>Amount</Text>
            </View>
          </View>
          {row.transactions.map((get, index) => (
          <View style={styles.detail_item_container} key={index}>
            <View style={styles.detail_item_container_desc}>
              <Text style={styles.font_detail_item}>
                {get.category.category_name}
              </Text>
              <Text style={styles.font_detail_title}>{get.title}</Text>
            </View>
            <View style={styles.detail_item_container_amount}>
              <Text
              style={[
                styles.font_detail_item_amount,
                get.type == 1 ? styles.greenText : styles.normalText,
              ]}
            >
              {formatCurrency(get.amount)}
            </Text>
            </View>
          </View>
          ))}

        </Layout>
      ))}
    </View>
     )}
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHight = Dimensions.get("window").height;

const styles = StyleSheet.create({

  container: {
    backgroundColor: "white",
    padding: 12,
    marginHorizontal: 15,
    marginTop: windowHight * 0.005,
    marginBottom: windowHight * 0.01,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  header_awal: {
    flexDirection: "row",
    marginTop: -7,
    marginLeft: -12,
    marginRight: -12,
    marginBottom: -12,
  },
  tanggal: {
    paddingRight: 2,
    paddingLeft: 10,
    width: "20%",
  },
  tanggal_detail: {
    flexDirection: "row",
    marginBottom: -3,
    marginTop: -5,
  },
  icon: {
    marginTop: 6,
    paddingRight: 3.5,
  },
  label_tanggal: {
    fontSize: 26,
    fontWeight: "bold",
  },
  label_tanggal_detail: {
    fontSize: 13,
    fontWeight: "bold",
    paddingBottom: 4,
    paddingTop: -15,
  },
  header: {
    flex: 1,
    width: "80%",
    // maxWidth : "1",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingRight: 8,
    marginTop: 2,
    paddingTop: 4,
    paddingBottom: 7,
    marginLeft: 8,
  },

  balances: {
    fontWeight: "700",
    color: "#66cc99",
    fontSize: 13,
    textAlign: "center",
  },
  header_style: {
    flex:1,
  },
  label_header: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },
  income: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 13,
  },
  expense: {
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 10,
  },

  header_deskripsi: {
    justifyContent: "space-between",
    flexDirection: "row",
    textAlign: "center",
  },

  detail_deskripsi: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 10,
  },
  font_header_deskripsi: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },

  detail_item_container: {
    justifyContent: "space-around",
    flex: 1,
    flexDirection: "row",
    marginTop: 2,
    marginBottom: 6,
  },

  detail_item_container_desc: {
    marginRight: 2,
    paddingRight: 0.04,
    width: "60%",
  },

  detail_item_container_amount: {
    marginLeft: 2,
    width: "40%",

    justifyContent: "space-around",
  },

  font_detail_item: {
    fontSize: 13,
  },
  font_detail_item_amount: {
    fontSize: 13,
    textAlign: "right",
  },
  font_detail_title: {
    fontSize: 13,
    color: "grey",
  },
  greenText: {
    color: "#66cc99",
  },
  redText: {
    color: "red",
  },
  normalText: {
    color: "black",
  },
});
