import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/EvilIcons'

const ProfSetScreen = () => {
    return(
        <View style={styles.Container}>
            <View style={styles.ImageContainer}>
                <Image 
                        source={require('../assets/app_images/avatar.png')} 
                        style={styles.Image}/>
            </View>
            <Text style={styles.NameTitle}> Grzesiek</Text>

            <View style={styles.SettingContainer}>
               <View style={styles.Sett}>
                    <View style={styles.SettIcon}>  
                        <Icon2 name="account" size={30} color={COLORS.primaryWhiteHex}/>
                        <Text style={styles.Title}> Dane konta</Text>
                    </View>
                    <Icon name="chevron-right" size={30} color={COLORS.primaryWhiteHex}/>
               </View>
               <View style={styles.Sett}>
                    <View style={styles.SettIcon}>  
                        <Icon2 name="account" size={30} color={COLORS.primaryWhiteHex}/>
                        <Text style={styles.Title}> Hasło i bezpieczeństwo</Text>
                    </View>
                    <Icon name="chevron-right" size={30} color={COLORS.primaryWhiteHex}/>
               </View>
               <View style={styles.Sett}>
                    <View style={styles.SettIcon}>  
                        <Icon3 name="trash" size={30} color={COLORS.primaryWhiteHex}/>
                        <Text style={styles.Title}> Usuń konto</Text>
                    </View>
                    <Icon name="chevron-right" size={30} color={COLORS.primaryWhiteHex}/>
               </View>
               <View style={styles.Sett}>
                    <View style={styles.SettIcon}>  
                        <Icon name="log-out" size={30} color={COLORS.primaryWhiteHex}/>
                        <Text style={styles.Title}> Wyloguj się</Text>
                    </View>
                    <Icon name="chevron-right" size={30} color={COLORS.primaryWhiteHex}/>
               </View>
            </View>

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
     ImageContainer:{
          flexDirection: 'column',
          width: '100%',
          paddingTop: 50,
            alignItems: 'center',
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


