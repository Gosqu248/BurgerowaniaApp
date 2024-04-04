import React from 'react';
import { Image, ImageProps, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';

interface CartItemProps {
    id: string;
    name: string;
    imagelink_square: ImageProps;
    price: any;
    type: string;
    quantity: string;
    incrementCartItemQuantityHandler: any;
    decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    imagelink_square,
    price,
    type,
    quantity,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler,
}) => {
    return(
        <View>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[COLORS.primaryOrangeHex, COLORS.primaryGreyHex]}
                style={styles.CartItemSingleLinearGradient}>
            <View> 
                <Image 
                    source={imagelink_square}
                    style={styles.CartItemSingleImage}/>
            </View>
            <View style={styles.CartItemSingleInfoContainer}> 
                <View>
                    <Text style={styles.CartItemTitle}>{name}</Text>
                    <Text style={styles.CartItemSubtitle}>{type}</Text>
                </View>
                <View>
                    <Text style={styles.CartItemPrice}>{price} zł</Text>
                </View>
                <View style={styles.CartItemSingleQuantityContainer}>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  decrementCartItemQuantityHandler(id,  quantity);
                }}>
                <Icon
                  name="minus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
              <View style={styles.CartItemQuantityContainer}>
                <Text style={styles.CartItemQuantityText}>
                  {quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.CartItemIcon}
                onPress={() => {
                  incrementCartItemQuantityHandler(id, price);
                }}>
                <Icon
                  name="plus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
              <View>

              </View>
            </View>
            <View style={styles.CartItemSumView}>   
                <Text style={styles.CartItemSum}>Suma: </Text>
                <Text style={styles.CartItemSum2}>{Number(price) * Number(quantity)} zł</Text>
            </View>

            </View>
           
            </LinearGradient>

        </View>
    );
};
const styles = StyleSheet.create({
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
       height: 220,
    },
    CartItemSingleImage:{
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
      },
      CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular, 
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
      },
      CartItemPrice:{
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
      },
      CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
      },
      CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4,
      },
      CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
      },
      CartItemSumView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      CartItemSum:{
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
        fontWeight: 'bold',
        textAlign: 'center',
        
      },
      CartItemSum2:{
        fontFamily: FONTFAMILY.poppins_bold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryOrangeHex,
        fontWeight: 'bold',
        textAlign: 'right',
      },
});

export default CartItem;


