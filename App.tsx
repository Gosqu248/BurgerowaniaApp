import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import TabNavigator from './src/navigator/TabNavigator';
import PaymentScreen from './src/screens/PaymentScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ProfSetScreen from './src/screens/ProfSetScreen';

import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screens/LoginScreen';
import SignScreen from './src/screens/SignScreen';



const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => { 
    SplashScreen.hide();
  }, []);

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

            <Stack.Screen
                name="ProfSet" 
                component={ProfSetScreen} 
                options={{animation: 'ios'}}>
            </Stack.Screen>

            <Stack.Screen
                name="Login" 
                component={LoginScreen} 
                options={{animation: 'ios'}}>
            </Stack.Screen>

            <Stack.Screen
                name="Sign" 
                component={SignScreen} 
                options={{animation: 'ios'}}>
            </Stack.Screen>

        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;

