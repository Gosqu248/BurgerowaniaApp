import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, Touchable, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { changePassword } from '../db/firesbase';
import { set } from 'firebase/database';
import GradientBGIcon from '../components/GradientBGIcon';

const checkLoginStatus = async () => {
     let name = '';
 
     try {
         const email = await AsyncStorage.getItem('email');
         if (email !== null && email !== undefined) {
             name = email; 
         }
     } catch (error) {
         console.log('Błąd podczas pobierania danych z AsyncStorage:', error);
     }
     return name; 
 };

const PasswordScreen = ({navigation}:any) => {

     const [name, setName] = useState('');
     const [password, setPassword] = useState('');
     const [newPassword, setNewPassword] = useState('');
     const [uri, setUri] = useState('');


     useEffect(() => {
         const fetchName = async () => {
             const retrievedName = await checkLoginStatus();
             setName(retrievedName);
         };
 
         fetchName();
     }, []);


    useEffect(() => {
        const getUri = async () => {
            const uri = await AsyncStorage.getItem('profileImage');
            if (uri !== null) {
                setUri(uri);
            }
        };
        getUri();
    }, []);

    
     const handlechangePassword = async () => {
        try {
          
            Alert.alert(
              'Potwierdzenie',
              'Czy na pewno chcesz zmienić hasło?',
              [
                {
                  text: 'Anuluj',
                  style: 'cancel',
                },
                {
                  text: 'Zmień hasło',
                  onPress: async () => {
                    
                    await changePassword(newPassword, password, name, navigation);
                },
                },
              ],
              { cancelable: false }
            );
          } catch (error) {
            console.log('Błąd podczas zmiany hasła:', error);
        }
    };
   

    return(
        <View style={styles.Container}>
            
                <View style={styles.ImageHeaderBarContainerWithBack}>
                                <TouchableOpacity onPress={() =>{
                                    navigation.navigate('ProfSet');
                                }}>
                                    <GradientBGIcon 
                                        name='chevron-left' 
                                        color={COLORS.primaryLightGreyHex} 
                                        size={FONTSIZE.size_24}
                                    />
                                </TouchableOpacity>
                </View>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    style={styles.ScrollViewFlex}>

            <View style={styles.ImageContainer}>
                <Image 
                        source={uri ? { uri: uri } : require('../assets/app_images/avatar.png')}
                        style={styles.Image}/>
                
                <Text style={styles.NameTitle}> {name} </Text>
            </View>

            <View style={styles.SettingContainer}>
               <Text style={styles.Title}> Zmiana hasła </Text>

               <LinearGradient 
                        start={{x:0, y:0}} 
                        end={{x:0, y:1}}
                        colors={['#212121', '#424242', '#616161']}
                        style={styles.InputButton}>
                        <TextInput 
                            placeholder="Obecne hasło" 
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholderTextColor="gray"  
                            style={styles.InputText}></TextInput>
                </LinearGradient>

                <LinearGradient 
                        start={{x:0, y:0}} 
                        end={{x:0, y:1}}
                        colors={['#212121', '#424242', '#616161']}
                        style={styles.InputButton}>
                        <TextInput 
                            placeholder="Nowe hasło" 
                            value={newPassword}
                            onChangeText={text => setNewPassword(text)}
                            placeholderTextColor="gray"  
                            style={styles.InputText}></TextInput>
                </LinearGradient>


                <LinearGradient 
                        start={{x:0, y:0}} 
                        end={{x:0, y:1}}
                        colors={['#FF5722', '#FF9800', '#FFC107']}
                        style={styles.InputButton2}>
                       <TouchableOpacity onPress={handlechangePassword}>
                            <Text style={styles.InputText}>Zmień hasła</Text>
                        </TouchableOpacity>
                </LinearGradient>
            </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    Container: {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: 'black',
     },
      ScrollViewFlex:{
        flexGrow: 1,
    },
    ImageHeaderBarContainerWithBack:{
        flexDirection: 'row',
        justifyContent: 'space-between',
       paddingRight: 290,
       paddingTop: 35,
    },
     ImageContainer:{
          flexDirection: 'column',
          width: '100%',
          paddingTop: 0,
         alignItems: 'center',
         justifyContent: 'center',
     },
     Image:{
          width: 200,
          height: 200,
          borderRadius: 50,
          justifyContent: 'center',
     },
     NameTitle:{
          fontSize: 40,
          paddingTop: 20,
          color: COLORS.primaryWhiteHex,
     },
     SettingContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingTop: 50,
     },
     Title: {
            fontSize: 26,
            color: COLORS.primaryWhiteHex,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingBottom: 30,
     },
     InputButton:{
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 25,
        width: 310,
        padding: 10,
        margin: 10,
    },
    InputText:{
        color: 'white',
        fontSize: 30,
    },
    InputButton2: {
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 25,
        width: 310,
        padding: 20,
        margin: 20,
        alignItems: 'center',
        justifyContent : 'center',
    },
});

export default PasswordScreen;


