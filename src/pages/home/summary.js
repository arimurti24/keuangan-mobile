import React, { useState,useEffect} from 'react';
import { Text, View,Dimensions } from 'react-native';
import { StyleSheet,ScrollView } from "react-native";

import {
  ApplicationProvider,
  Layout,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import Ionicons from "react-native-vector-icons/Ionicons";
import formatCurrency from "../../component/FormatCurrency";
import axios from "axios";
import { useData } from "../../component/DataContext";

export const Summary = () => {

  const [parameter, setParameter] = useState({
    year: '2024', month: '02'
  });
  const { refreshing, setRefreshing } = useData();
  const { dataTransaction, updateDataTransaction } = useData();
  const [data, setData] = useState([]);

  useEffect(() => {
    handlePostRequest();
  
  }, [refreshing,dataTransaction]);

  const handlePostRequest = async () => {
    try {
      const response = await axios.post('https://app.kelasprogrammer.com/keuangan-laravel/public/api/summary', parameter);
      console.log('Response:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

    return (
      <Layout style={styles.container}>
      <View style={styles.style_higlight}>
        <View style={styles.keterangan}>
              <View>
                <Text style={styles.title}>Summary This Month</Text>
              </View>
              <View style={styles.keterangan_detail}>
                <Text style={styles.font}>Income</Text>
                <Text style={styles.font}>{formatCurrency(data.total_income)}</Text>
                </View>
                <View style={styles.keterangan_detail}>
                <Text style={styles.font}>Expenses</Text>
                <Text style={styles.font}>{formatCurrency(data.total_expense)}</Text>
                </View>
                <View style={styles.keterangan_detail}>
                <Text style={styles.font}>Balance</Text>
                <Text style={styles.font}>{formatCurrency(data.total_balance)}</Text>
                </View>
        </View>
        <View style={styles.saving}>
          <Text style={styles.saving_label}>Saving</Text>
          <Text style={[
                styles.saving_number,
                data.total_saving <= 0 ? styles.redText : styles.normalText,
              ]}>{data.total_saving}%</Text>
        </View>
      </View>
    </Layout>
    )
  
}

const windowWidth = Dimensions.get("window").width;
const windowHight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 12,
    marginHorizontal: 30,
    borderRadius: 10,
    marginTop: -windowHight * 0.08,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  style_higlight : {
    flexDirection: "row",
  },
  title : {
    fontSize:20,
    fontWeight:'700',
    marginBottom:17,
  },
  keterangan : {
    width:'75%',
    padding:5,
    marginRight:4,
    paddingRight:5,

  },

  keterangan_detail : {
    flexDirection:'row',
    justifyContent:'space-between',
    padding:-4,
    flex:1,
  
  },
  saving : {
    width:'25%',
    padding:2,
    borderStartColor:'red',
    backgroundColor:'#ecf9f2',
    borderRadius:5,
 
  },
  saving_label : {
    paddingTop:15,
    fontSize:13,
    fontWeight:'700',
    textAlign: 'center'
  },
  saving_number : {
    fontSize:30,
    fontWeight:'700',
    textAlign: 'center',
    color:'#194d33',
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
  style_amount : {
    textAlign:'right',
    flex:1,
    marginLeft:8,
  },
  font : {
    fontSize:14,
    fontWeight:'600',
    fontStyle:'normal',
  }
});


