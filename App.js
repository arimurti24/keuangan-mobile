// In App.js in a new project

import * as React from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DataProvider } from './src/component/DataContext';

import Route from './src/router';

function App() {
  return (
    <NavigationContainer>
      <DataProvider>
  
      <Route/>
   
      </DataProvider>
   
    </NavigationContainer>
  
  );
}

export default App;