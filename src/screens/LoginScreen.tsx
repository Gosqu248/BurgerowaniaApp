import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, Alert } from 'react-native';
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { signInWithEmail, signInWithGoogle } from '../db/firesbase';
import {GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({navigation}: any) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        checkLoginStatus();
    }, []);
    
    

    const checkLoginStatus = async () => {
        const email = await AsyncStorage.getItem('email');
        if (email !== null && email !== undefined) {
            console.log(email);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Tab' }],
              });
        }
    };

    const handleSignIn = async () => {
        setLoading(true);
        await signInWithEmail(email, password, navigation);
        setLoading(false);
    };

    const handleSignInWithGoogle = async () => {
        await signInWithGoogle(navigation);
    };


  
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
                        <TextInput 
                            placeholder="Email" 
                            value={email}
                            placeholderTextColor="gray" 
                            onChangeText={text => setEmail(text)}
                            style={styles.InputText}></TextInput>
                    </LinearGradient>

                    <LinearGradient 
                        start={{x:0, y:0}} 
                        end={{x:0, y:1}}
                        colors={['#212121', '#424242', '#616161']}
                        style={styles.InputButton}>
                        <TextInput 
                            placeholder="Password" 
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true} 
                            placeholderTextColor="gray"  
                            style={styles.InputText}></TextInput>
                    </LinearGradient>

                    <View style={styles.SignContainer}>
                        <Text style={styles.SignText1}> Zapomniałeś hasła?</Text>
                        <TouchableOpacity
                            onPress= {() => {
                                navigation.navigate('Reset');
                            }}>

                            <Text style={styles.SignText2}> Przypomnij je</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.LoginButton}>
                        <TouchableOpacity onPress={handleSignIn}>
                            <Text style={styles.LoginText}> Zaloguj się</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.SignText1}>Lub zaloguj się za pomocą</Text>
                        <GoogleSigninButton
                            style={styles.GoogleButton}
                            size={GoogleSigninButton.Size.Icon}
                            color={GoogleSigninButton.Color.Light}
                            onPress={handleSignInWithGoogle}
                        />

                    

                    <View style={styles.SignContainer}>
                        <Text style={styles.SignText1}> Nie masz konta?</Text>
                        <TouchableOpacity
                            onPress= {() => {
                                navigation.navigate('Sign');
                            }}>

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
        marginTop: 30,
       height: 150,
       width: 150,
       position: 'absolute',
       borderRadius: 35,
    },
    Title:{
        marginTop: 180,
        fontFamily: 'Poppins-Bold',
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
    },
    InputContainer:{
        marginTop: 250,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    InputButton:{
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 25,
        width: 370,
        padding: 5,
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
        alignItems: 'flex-end',
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
    GoogleButton:{
        width: 100,
        height: 70,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 30,
    }
});

export default LoginScreen;


