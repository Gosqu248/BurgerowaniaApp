import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';

interface PaymentMethodProps {
    paymentMode: any;
    name: string;
    icon: any;
}


const PaymentMethod: React.FC<PaymentMethodProps> = ({
    paymentMode,
    name,
    icon
}) => {
    return(
        <View style={[styles.PaymentCardContainer, 
        {borderColor: 
            paymentMode == name 
            ? COLORS.primaryOrangeHex
            : COLORS.primaryGreyHex,
        },
        ]}>
            <LinearGradient 
                start={{x:0, y:0}}
                end={{x:1, y:1}} 
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.LinearGradientRegular}>

                <Image source={icon} style={styles.PaymentImage}/>
                <Text style={styles.PaymentTitle}>{name}</Text>
            </LinearGradient> 
        </View>
    );
};
const styles = StyleSheet.create({
    PaymentCardContainer:{
        borderRadius: BORDERRADIUS.radius_25,
        backgroundColor: COLORS.primaryGreyHex,
        borderWidth: 3,
    },
    LinearGradientRegular:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        paddingHorizontal: SPACING.space_24,
        gap: SPACING.space_24,
        borderRadius: BORDERRADIUS.radius_15 *2,
    },
    PaymentImage:{
        height: SPACING.space_30,
        width: SPACING.space_30,
    },
    PaymentTitle:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
});

export default PaymentMethod;


