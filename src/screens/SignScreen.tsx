import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, Alert } from 'react-native';
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { signUp } from '../db/firesbase';


const SignScreen = ({navigation}: any) => {

        const [login, setLogin] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);

       const handleSignUp = async () => {
            setLoading(true);
            await signUp(email, password, navigation);
            setLoading(false);
        }
    


    return(
        <View style={styles.Container}>
            <Image source={require('../assets/app_images/loginBack.jpg')} style={styles.Image}></Image>
            <Image source={require('../assets/app_images/burgerowniaIcon.jpg')} style={styles.Logo}></Image>
            <Text style={styles.Title}> Zarejestruj się </Text>

            <View style={styles.InputContainer}>
                    

                    <LinearGradient 
                        start={{x:0, y:0}} 
                        end={{x:0, y:1}}
                        colors={['#212121', '#424242', '#616161']}
                        style={styles.InputButton}>
                        <TextInput 
                            placeholder="E-mail" 
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor="gray" 
                            style={styles.InputText}></TextInput>
                    </LinearGradient>

                    <LinearGradient 
                        start={{x:0, y:0}} 
                        end={{x:0, y:1}}
                        colors={['#212121', '#424242', '#616161']}
                        style={styles.InputButton}>
                        <TextInput 
                            placeholder="Password" 
                            placeholderTextColor="gray"  
                            value={password}
                            secureTextEntry={true} 
                            onChangeText={(text) => setPassword(text)}
                            style={styles.InputText}></TextInput>
                    </LinearGradient>

                    <View style={styles.LoginButton}>
                        <TouchableOpacity onPress={handleSignUp}>
                            <Text style={styles.LoginText}> Zarejestruj się</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.SignContainer}>
                        <Text style={styles.SignText1}> Masz już konto?</Text>
                        <TouchableOpacity
                            onPress= {() => {
                                navigation.navigate('Login');
                            }}>
                            <Text style={styles.SignText2}> Zaloguj się</Text>
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
        marginTop: 270,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    InputButton:{
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 25,
        width: 370,
        padding: 10,
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
        paddingTop: 135,
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

export default SignScreen;


