import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfilePic = () => {

    const [uri, setUri] = useState('');
    const [refreshKey, setRefreshKey] = useState(0); // Nowy klucz do wymuszenia odświeżenia


    useEffect(() => {
        const getUri = async () => {
            const uri = await AsyncStorage.getItem('profileImage');
            if (uri !== null) {
                setUri(uri);
            }
            refreshImage();
        };
        getUri();
    }, [refreshKey]);

    const refreshImage = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };
    
    return(
        <View style={styles.ImageContainer}>
                <Image 
                        source={uri ? { uri: uri } : require('../assets/app_images/avatar.png')} 
                        style={styles.Image}/>
        </View>
    );
};
const styles = StyleSheet.create({
    ImageContainer: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        borderRadius: SPACING.space_12,
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    Image: {
        height: SPACING.space_36,
        width: SPACING.space_36,
    },
});

export default ProfilePic;


