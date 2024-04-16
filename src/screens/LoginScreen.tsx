import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, Alert } from 'react-native';
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';


const LoginScreen = ({navigation}: any) => {
  
    return(
        <View style={styles.Container}>
            <Image source={require('../assets/app_images/loginBack.jpg')} style={styles.Image}></Image>
            <Image source={require('../assets/app_images/burgerowniaIcon.jpg')} style={styles.Logo}></Image>
            <Text style={styles.Title}> Zaloguj się </Text>

            <View style={styles.InputContainer}>
                    <LinearGradient 
                        start={{x:0, y:0}} 
                        end={{x:0, y:1}}
                        colors={['#212121', '#424242', '#616161']}
                        style={styles.InputButton}>
                        <TextInput placeholder="Login" placeholderTextColor="gray" style={styles.InputText}></TextInput>
                    </LinearGradient>

                    <LinearGradient 
                        start={{x:0, y:0}} 
                        end={{x:0, y:1}}
                        colors={['#212121', '#424242', '#616161']}
                        style={styles.InputButton}>
                        <TextInput placeholder="Password" secureTextEntry={true} placeholderTextColor="gray"  style={styles.InputText}></TextInput>
                    </LinearGradient>

                    <View style={styles.LoginButton}>
                        <TouchableOpacity>
                            <Text style={styles.LoginText}> Zaloguj się</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.SignContainer}>
                        <Text style={styles.SignText1}> Nie masz konta?</Text>
                        <TouchableOpacity
                            onPress= {() => {
                                navigation.navigate('Sign');
                            }}>npm install --save @react-native-firebase/app

                            <Text style={styles.SignText2}> Zarejestruj się</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Container:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.primaryWhiteHex,
        
    },
    Image:{
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    Logo:{
        marginTop: 70,
       height: 150,
       width: 150,
       position: 'absolute',
       borderRadius: 35,
    },
    Title:{
        marginTop: 240,
        fontFamily: 'Poppins-Bold',
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
    },
    InputContainer:{
        marginTop: 350,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    InputButton:{
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 25,
        width: 370,
        padding: 15,
        margin: 10,
        
    },
    InputText:{
        color: 'white',
        fontSize: 30,
    },
    LoginButton:{
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 25,
        width: 350,
        height: 90,
        padding: 15,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoginText:{
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
    },
    SignContainer:{
        flexDirection: 'row',
        paddingTop: 50,
        margin: 20,
    },
    SignText1:{
        color: 'white',
        fontSize: 20,
    },
    SignText2:{
        color: COLORS.primaryOrangeHex,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default LoginScreen;


