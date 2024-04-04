import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface PaymentFooterProps {
    price: string;
    buttonPressHandler: any;
    buttonTitle: string;
    title: string;
}


const PaymentFooter: React.FC<PaymentFooterProps> = ({
    price, 
    buttonPressHandler, 
    buttonTitle,
    title

    }) => {

    return(
        <View style={styles.PriceFooter}>
            <View style={styles.PriceContainer}>
                    <Text style={styles.PriceTitle}> {title}</Text>
                <Text style={styles.PriceText}>{price} zł </Text>
            </View>

            <TouchableOpacity 
                style={styles.PayButton}
                onPress={() => buttonPressHandler()}>
                <Text style={styles.PayButtonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PaymentFooter;

const styles = StyleSheet.create({
    PriceFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: SPACING.space_20,
        padding: SPACING.space_20,
      
    },
    PriceContainer: {
        alignItems: 'center',
        width: 120,
    },
    PriceTitle: {
        fontFamily:FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.secondaryLightGreyHex,
    },
    PriceText: {
        fontSize: FONTSIZE.size_24,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontWeight: 'bold',
    },
    PayButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 *2,
        borderRadius: BORDERRADIUS.radius_20
    },
    PayButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
});

