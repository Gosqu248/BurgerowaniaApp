import React from 'react';
import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Icons from "react-native-vector-icons/AntDesign"
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface FoodCardProps {
    id: string;
    index: number;
    type: string;
    stage: string;
    imagelink_square: ImageProps;
    name: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const FoodCard: React.FC<FoodCardProps> = ({
    id,
    index,
    type,
    stage,
    imagelink_square,
    name,
    average_rating,
    price,
    buttonPressHandler,
 }) => {

    return(
        <LinearGradient
         start={{x:0, y:0}}
         end={{x:1, y:1}}
         style={styles.CardLinearGradientContainer}
         colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
            <ImageBackground 
                source={imagelink_square} 
                style={styles.CardImageBG}
                resizeMode="cover">
                    <View style={styles.CardRatingContainer}>
                        <Icons 
                            name={'star'} 
                            color={COLORS.primaryOrangeHex}
                            size={FONTSIZE.size_16}
                        />
                        <Text style={styles.CardRatingText}> {average_rating}</Text>
                    </View>
            </ImageBackground>
            <Text style={styles.CardTitle}> {name}</Text>
            <View style={styles.CardFooterRow}>
                <Text style={styles.CardPriceCurrency}>
                     <Text style={styles.CardPrice}> {price} </Text>
                     zł
                </Text>
                <TouchableOpacity onPress={() => {
                    buttonPressHandler({
                        id, 
                        index, 
                        name, 
                        stage, 
                        imagelink_square, 
                        type, 
                        price,  
                    });
                }}>
                    <BGIcon 
                      color={COLORS.primaryWhiteHex} 
                      name={'plus'} 
                      BGColor={COLORS.primaryOrangeHex}
                      size={FONTSIZE.size_10}/>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};
const styles = StyleSheet.create({
    CardLinearGradientContainer:{
        padding:SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CardImageBG:{
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    CardRatingContainer:{
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right:0,
    },
    CardRatingText:{
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        lineHeight: 22,
    },
    CardTitle:{
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubTitle:{
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
    },
    CardFooterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SPACING.space_15,
    },
    CardPriceCurrency:{
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.primaryWhiteHex,
        fontWeight: 'bold',
        fontSize: FONTSIZE.size_18,
    },
    CardPrice:{
    },
});

export default FoodCard;


