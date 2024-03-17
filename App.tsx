import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import TabNavigator from './src/navigator/TabNavigator';
import PaymentScreen from './src/screens/PaymentScreen';
import DetailsScreen from './src/screens/DetailsScreen';



const Stack = createNativeStackNavigator();

const App = () => {
 

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen 
              name="Tab" 
              component={TabNavigator} 
              options={{animation: 'slide_from_bottom'}}>
            </Stack.Screen>

            <Stack.Screen 
              name="Details" 
              component={DetailsScreen} 
              options={{animation: 'slide_from_bottom'}}>
            </Stack.Screen>


            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen} 
              options={{animation: 'slide_from_bottom'}}>
            </Stack.Screen>

        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;

