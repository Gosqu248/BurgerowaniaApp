import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import {useNavigation} from '@react-navigation/native'

interface HeaderBarProps {
    title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
    const navigation = useNavigation();

    const goToProfSet = () => {
      navigation.navigate('ProfSet'); 
    };

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    return(
        <View style={styles.HeaderContainer}>
            <TouchableOpacity onPress={goToLogin}>
                <GradientBGIcon 
                    name="menu" 
                    color={COLORS.primaryLightGreyHex} 
                    size={FONTSIZE.size_16}/>
            </TouchableOpacity>

            <Text style={styles.HeaderText}>{title}</Text>
            <TouchableOpacity onPress={goToProfSet}>
                <ProfilePic/>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    HeaderContainer:{
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
    },
});

export default HeaderBar;


