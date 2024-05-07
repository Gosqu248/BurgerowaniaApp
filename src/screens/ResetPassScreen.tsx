import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, Alert } from 'react-native';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import GradientBGIcon from '../components/GradientBGIcon';
import { resetPassword } from '../db/firesbase';


const ResetPassScreen = ({navigation}: any) => {

        const [email, setEmail] = useState('');

       const resetPass = async () => {
        resetPassword(email);
        navigation.goBack();
        }
    


    return(
        <View style={styles.Container}>
            <Image source={require('../assets/app_images/loginBack.jpg')} style={styles.Image}></Image>
            <View style={styles.ImageHeaderBarContainerWithBack}>
                            <TouchableOpacity onPress={() =>{
                                navigation.goBack();
                            }}>
                                <GradientBGIcon 
                                    name='chevron-left' 
                                    color={COLORS.primaryOrangeHex} 
                                    size={32}
                                />
                            </TouchableOpacity>
            </View>
            <Image source={require('../assets/app_images/burgerowniaIcon.jpg')} style={styles.Logo}></Image>
            <Text style={styles.Title}> Przypomnij hasło</Text>

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


                    <View style={styles.ResetButton}>
                        <TouchableOpacity onPress={resetPass}>
                            <Text style={styles.LoginText}> Przypomnij</Text>
                        </TouchableOpacity>
                    </View>

                    
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    Container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'black',   
    },
    ImageHeaderBarContainerWithBack:{
        flexDirection: 'row',
        justifyContent: 'space-between',
       paddingRight: 290,
       paddingTop: 35,
       position: 'absolute',
    },
    Image:{
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    Logo:{
        marginTop: 100,
       height: 150,
       width: 150,
       position: 'absolute',
       borderRadius: 35,
    },
    Title:{
        marginTop: 250,
        fontFamily: 'Poppins-Bold',
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
    },
    InputContainer:{
        marginTop: 340,
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
        margin: 20,
        
    },
    InputText:{
        color: 'white',
        fontSize: 30,
    },
    ResetButton:{
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 25,
        width: 350,
        height: 90,
        padding: 15,
        margin: 20,
        marginTop: 80,
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

export default ResetPassScreen;


