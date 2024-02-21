import React, { useState} from 'react';
import { Text, View , Button} from 'react-native';
import { StyleSheet,ScrollView } from "react-native";

import { PieChart } from 'react-native-chart-kit';

export const Orders = () => {


  const data = [
    {
      name: 'Seoul',
      population: 21500000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#0F0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#00F',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: '#FF0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];


  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
    return (
      <View>
        <Text> Oder say90909a </Text>
 <PieChart
      data={data}
      width={300}
      height={220}
      chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      accessor="population"
      backgroundColor="white"
      paddingLeft="15"
    />
      </View>
    )
  
}

const styles = StyleSheet.create({

});



