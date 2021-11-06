import React from 'react';
import HomeScreen from './Database/Homescreen'
import {  createStackNavigator } from '@react-navigation/stack'; 


const Stack = createStackNavigator();

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
 
import { NavigationContainer } from '@react-navigation/native';

//OBS SQLITE: 
//we don’t need to establish any kind of connections for it like JDBC, ODBC.
 //We only have to define the SQL statements for creating and updating the database. 

 function App () {
  return(
   <HomeScreen />
  )
}
export default App;