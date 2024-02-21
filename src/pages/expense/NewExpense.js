import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

import axios from "axios";
import { useData } from "../../component/DataContext";


import {
  HelperText,
  Button,
  TextInput,
  Appbar,
  PaperProvider,
  List,
  Snackbar,
  MD3LightTheme,
} from "react-native-paper";
export const NewExpense = ({ navigation }) => {


  const { dataTransaction, updateDataTransaction } = useData();


  
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState('2024-02-19');
  const [errorDate, setErrorDate] = useState(false);

  const [open2, setOpen2] = useState(false);


  const [dataCategory, setDataCategory] = useState([]);


  const [category, setCategory] = useState(null);
  const [errorCategory, setErrorCategory] = useState(true);


  const [title_income, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [amount, setAmount] = useState('');
  const [errorAmount, setErrorAmount] = useState(false);



  const handleCategoryChange = (value) => {


      setErrorCategory(false);
   
      console.log(errorCategory);
  };


  const handleDateChange = (text) => {
    setDate(text);
    if (text.length<=0) {
      setErrorDate(true);
      }else {
        setErrorDate(false);
      } 
  };

  const handleTitleChange = (text) => {
    setTitle(text);
    if (text.length<=0) {
      setErrorTitle(true);
      }else {
        setErrorTitle(false);
      } 
  };

  const handleAmountChange = (text) => {
    setAmount(text);
    if (text.length<=0) {
      setErrorAmount(true);
      }else {
        setErrorAmount(false);
      } 
  };



  const handleSubmit = () => {
    console.log('category ',errorCategory);
    console.log('date ',errorDate);
    console.log('title ',errorTitle);
    console.log('amount ',errorAmount);


   if (errorCategory==false && errorDate==false && errorTitle==false && errorAmount==false){
      createTransaction();

      const newData = [dataTransaction, 'New Transaction'];
      updateDataTransaction(newData);

      navigation.navigate('Home');

    }

  };

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  
  const errorMessage = (text) => {
    return text;
  };
  

  useEffect(() => {

    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://app.kelasprogrammer.com/keuangan-laravel/public/api/get-category/2"
      );
      setDataCategory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createTransaction = async () => {
    try {
      const response = await fetch(
        "https://app.kelasprogrammer.com/keuangan-laravel/public/api/transaction-store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "date": date,
            "category_id": category,
            "title": title_income,
            "type" : '2',
            "amount" : amount,
          })        
         }
      );


  
      if (response.ok && response.status >= 200 && response.status < 300) {
        // Handle success
    
        console.log("Data submitted successfully");
      } else {
        // Handle errors
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };


  

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
      </Appbar.Header>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            <Ionicons
              name="arrow-down-circle-outline"
              style={styles.icon_title}
              size={31}
              color="black"
            />
            New Expense
          </Text>
        </View>

{/*         
        <List.Item
          title="First Item"
          description="Item description"
          left={(props) => <List.Icon {...props} icon="folder" />}
        /> */}

        {/* <Button icon="send" mode="contained" onPress={() => setOpen2(true)}>
          Press me
        </Button>

        <DatePicker
          modal
          open={open2}
          date={date}
          onConfirm={(date) => {
            setOpen2(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen2(false);
          }}
        /> */}

        <DropDownPicker
          open={open}
          items={dataCategory.map((item) => ({
            label: item.category_name,
            value: item.id,
          }))}
         
          value={category}
          setOpen={setOpen}
          placeholder="Select Category"
          setValue={setCategory}
          onSelectItem={handleCategoryChange}
        />

<HelperText type="error" visible={errorCategory==true}>
          {errorMessage('Category cannot be blank')}
      </HelperText>

        <TextInput
          error={errorDate}
          mode="outlined"
          label="Date"
          value={date}
          placeholder="Enter Date"
          onChangeText={handleDateChange}
        />
          <HelperText type="error" visible={errorDate==true}>
          {errorMessage('Date cannot be blank')}
      </HelperText>

        <TextInput
          error={errorTitle}
          mode="outlined"
          label="Title"
          value={title_income}
          placeholder="Enter Title"
          onChangeText={handleTitleChange}
        />
           <HelperText type="error" visible={errorTitle==true}>
            {errorMessage('Title cannot be blank')}
        </HelperText>

        <TextInput   error={errorAmount}   value={amount}  mode="outlined"  keyboardType="numeric" label="Amount" placeholder="Enter Amount"  onChangeText={handleAmountChange} />
        <HelperText type="error" visible={errorAmount==true}>
            {errorMessage('Amount cannot be blank')}
        </HelperText>
        <Button icon="database" mode="contained" onPress={handleSubmit} style={styles.Button_submit}>
          SAVE
        </Button>
{/* 
        <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
        <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        Hey there! I'm a Snackbar.
      </Snackbar> */}


      </View>
    </PaperProvider>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 12,
    marginHorizontal: 5,
    marginTop: windowHight * 0,
  },
  title: {
    marginBottom: windowHight * 0.05,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "400",
  },
  icon_title: {},
  Button_submit: {
    marginTop: windowHight * 0.06,
  },
});
