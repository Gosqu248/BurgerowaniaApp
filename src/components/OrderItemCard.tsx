import React from 'react';
import { StyleSheet, Image, View, ImageProps, Text } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

interface OrderItemCardProps {
    type: string;
    name: string;
    price: string;
    imagelink_square: ImageProps;
    ItemPrice: string;
    quantity: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
    type,
    name,
    price,
    imagelink_square,
    ItemPrice,
    quantity,
}) => {
    return(
        <LinearGradient 
            start={{x:0, y:0}} 
            end={{x:1, y:1}}
            colors={[COLORS.primaryOrangeHex, COLORS.primaryBlackHex]}
            style={styles.CardLinearGradient}>
            <View style={styles.CardInfoContainer}>
                <View style={styles.CardImageInfoContainer}>
                    <Image 
                        source={imagelink_square}
                        style={styles.Image}/>
                    <View>
                        <Text style={styles.CardTitle}>{name}</Text>
                        <Text style={styles.CardSubtitle}>{type}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.BoxContainer}>
                    <View style={styles.BoxLeft}>
                        <Text style={styles.PriceTitle}> {price} zł </Text>
                    </View>
                    <View style={styles.BoxRight}>
                        <Text style={styles.PriceTitle2}> X
                            <Text style={styles.PriceTitle}>  {quantity}</Text>
                        </Text>
                    </View>
                    <View style={styles.PriceContainer}>
                        <Text style={styles.CardPrice}>{ItemPrice} zł</Text>
                    </View>
            </View>
            
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    CardLinearGradient:{
        gap: SPACING.space_20,
        padding: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CardInfoContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    CardImageInfoContainer:{
        flexDirection: 'row',
        gap: SPACING.space_20,
        alignItems: 'flex-start',
    },
    Image:{
        height: 120,
        width: 150,
        borderRadius: BORDERRADIUS.radius_15,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
        width: 150,
    },
    CardSubtitle:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    PriceContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '50%',

    },
    CardPrice:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        fontWeight: 'bold',
        color: COLORS.primaryWhiteHex,
    },
    BoxContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    BoxLeft:{
        backgroundColor: 'black',
        width: 80,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: BORDERRADIUS.radius_15,
        borderBottomLeftRadius: BORDERRADIUS.radius_15,
        borderRightWidth: 1,
        borderRightColor: COLORS.primaryGreyHex,
    },
    BoxRight:{
        backgroundColor: 'black',
        width: 80,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: BORDERRADIUS.radius_15,
        borderBottomRightRadius: BORDERRADIUS.radius_15,
        borderLeftWidth: 1,
        borderLeftColor: COLORS.primaryGreyHex,
    },
    PriceTitle:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        fontWeight: 'bold',
    },
    PriceTitle2:{  
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        fontWeight: 'bold',
    },
});

export default OrderItemCard;


