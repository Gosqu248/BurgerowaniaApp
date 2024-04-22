import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, Touchable, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/EvilIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import {signOut, removeAccount} from '../db/firesbase';
import ImagePicker, { Asset, ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'; 
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


 

const ProfSetScreen = ({navigation}:any) => {

     const [name, setName] = useState('');


     useEffect(() => {
         const fetchName = async () => {
             const retrievedName = await checkLoginStatus();
             setName(retrievedName);
         };
 
         fetchName();
     }, []);

     const handleSignOut = async () => {

        try {
          
            Alert.alert(
              'Potwierdzenie',
              'Czy na pewno chcesz się wylogować?',
              [
                {
                  text: 'Anuluj',
                  style: 'cancel',
                },
                {
                  text: 'Wyloguj się',
                  onPress: async () => {
                    
                    await signOut(navigation);
                },
                },
              ],
              { cancelable: false }
            );
          } catch (error) {
            console.log('Błąd podczas wylogowywania:', error);
        }
    };
        

      const handleRemoveAccount = async () => {
        try {
          
          Alert.alert(
            'Potwierdzenie',
            'Czy na pewno chcesz usunąć konto?',
            [
              {
                text: 'Anuluj',
                style: 'cancel',
              },
              {
                text: 'Usuń',
                onPress: async () => {
                  
                  await removeAccount(navigation);
                },
              },
            ],
            { cancelable: false }
          );
        } catch (error) {
          console.log('Błąd podczas usuwania konta:', error);
        }
      };

      type ImagePickerResponse = {
        [x: string]: any;
        assets?: Asset[];
        error?: string;
    };

    const [pickerResponse, setPickerResponse] = useState<ImagePickerResponse | null>(null);

    const openGallery = async () => {
        const options: ImageLibraryOptions = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        };
    
        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (!response.didCancel && response.assets && response.assets.length > 0) {
                const selectedImageUri = response.assets[0].uri ?? '';
                setUri(selectedImageUri);
                AsyncStorage.setItem('profileImage', selectedImageUri.toString())
                    .then(() => {
                        console.log('URI zapisano w AsyncStorage:', selectedImageUri);
                    })
                    .catch((error) => {
                        console.error('Błąd podczas zapisywania URI w AsyncStorage:', error);
                    });
            }
        });
    };
     
    

    const [uri, setUri] = useState('');

    useEffect(() => {
        const getUri = async () => {
            const storedUri = await AsyncStorage.getItem('profileImage');
            if (storedUri !== null) {
                setUri(storedUri);
            }
        };
        getUri();
        console.log('uri:', uri);

    }, []);
    

    return(
        <View style={styles.Container}>
            <View style={styles.ImageHeaderBarContainerWithBack}>
                            <TouchableOpacity onPress={() =>{
                                navigation.navigate('Tab');
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
                <TouchableOpacity onPress={openGallery}>
                    <View style={styles.Sett}>
                            <View style={styles.SettIcon}>  
                                <Icon2 name="account" size={30} color={COLORS.primaryWhiteHex}/>
                                <Text style={styles.Title}> Zmień avatar</Text>
                            </View>
                            <Icon name="chevron-right" size={30} color={COLORS.primaryWhiteHex}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Pass')}>
                    <View style={styles.Sett}>
                            <View style={styles.SettIcon}>  
                                <Icon2 name="account" size={30} color={COLORS.primaryWhiteHex}/>
                                <Text style={styles.Title}> Hasło i bezpieczeństwo</Text>
                            </View>
                            <Icon name="chevron-right" size={30} color={COLORS.primaryWhiteHex}/>
                    </View>
                </TouchableOpacity>

               <TouchableOpacity onPress={handleRemoveAccount}>
                <View style={styles.Sett}>
                        <View style={styles.SettIcon}>  
                            <Icon3 name="trash" size={30} color={COLORS.primaryWhiteHex}/>
                            <Text style={styles.Title}> Usuń konto</Text>
                        </View>
                        <Icon name="chevron-right" size={30} color={COLORS.primaryWhiteHex}/>
                </View>
               </TouchableOpacity>

               <TouchableOpacity onPress={handleSignOut}>
                <View style={styles.Sett}>
                        <View style={styles.SettIcon}>  
                            <Icon name="log-out" size={30} color={COLORS.primaryWhiteHex}/>
                            <Text style={styles.Title}> Wyloguj się</Text>
                        </View>
                        <Icon name="chevron-right" size={30} color={COLORS.primaryWhiteHex}/>
                </View>
               </TouchableOpacity>

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
        width: '100%',
        paddingTop: 50,
     },
    
     Sett:{
          borderBottomWidth: 3,
          borderBottomColor: COLORS.primaryLightGreyHex,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 10,
          paddingLeft: 10,
          alignItems: 'center',
          width: '100%',
     },
     Title: {
            fontSize: 23,
            color: COLORS.primaryWhiteHex,
            alignItems: 'flex-start',
            paddingTop: 30,
            paddingBottom: 30,
     },
     SettIcon:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
     },
});

export default ProfSetScreen;


