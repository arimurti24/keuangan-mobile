import React from "react";
import { Text, View } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";


export const AllTime = () => {

  const pieData = [

    {value: 12, color: '#93FCF8', gradientCenterColor: '#3BE9DE'},
    {value: 9, color: '#BDB2FA', gradientCenterColor: '#8F80F3'},
  
  ];
  
  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  
  return (
    <>
  
      <View
    style={{
      paddingVertical: 100,
   
      flex: 1,
    }}>
    <View
      style={{
        margin: 20,
        padding: 12,
        borderRadius: 12,
        backgroundColor: 'white',
      }}>
      <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
        Performance
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#e0ebeb'}
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'black', fontWeight: 'bold'}}>
                  47%
                </Text>
                <Text style={{fontSize: 14, color: 'black'}}>Excellent</Text>
              </View>
            );
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 10,
         
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 120,
            marginRight: 20,
            
          }}>
          {renderDot('#006DFF')}
          <Text style={{color: 'black'}}>Excellent: 47%</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
          {renderDot('#8F80F3')}
          <Text style={{color: 'black'}}>Okay: 16%</Text>
        </View>
      </View>
   
    </View>
  </View>

    </>
  );
};