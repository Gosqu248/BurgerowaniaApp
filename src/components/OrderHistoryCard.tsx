import React from 'react';
import { StyleSheet, Image, View, Text, Touchable, TouchableOpacity } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import OrderItemCard from './OrderItemCard';
import LinearGradient from 'react-native-linear-gradient';

interface OrderHistoryCardProps {
    navigationHandler: any;
    CartList: any;
    CartListPrice: string;
    OrderDate: string;
    

}

const OrderHistoryCard: React.FC<OrderHistoryCardProps>= ({
    navigationHandler,
    CartList,
    CartListPrice,
    OrderDate,
}) => {
    return(
        <View style={styles.CardContainer}>
            <LinearGradient 
                    start={{x:1, y:0}} 
                    end={{x:0, y:1}}
                    colors={['black','grey']}
                    style={styles.CardLinearGradient}>
                <View style={styles.CardHeader}>
                    <View>
                        <Text style={styles.HeaderTitle}>Data zamówienia</Text>
                        <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
                    </View>
                    <View style={styles.PriceContainer}> 
                        <Text style={styles.HeaderTitle}>Łączna kwota</Text>
                        <Text style={styles.HeaderPrice}>{CartListPrice} zł</Text>
                    </View>
                </View>
                
                <View style={styles.ListContainer}>
                    {
                        CartList.map((data: any, index: any) => (
                            <TouchableOpacity 
                                key={index.toString() + data.id}
                                onPress={() => {
                                    navigationHandler({
                                        index: data.index, 
                                        id: data.id, 
                                        type: data.type, 
                                    });
                                }}>
                                <OrderItemCard 
                                    type={data.type}
                                    name={data.name}
                                    price={data.price}
                                    imagelink_square={data.imagelink_square}
                                    ItemPrice={data.ItemPrice}
                                    quantity={data.quantity}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </LinearGradient>
        </View>
    );
};
const styles = StyleSheet.create({
    CardContainer:{
        gap: SPACING.space_10,
        marginBottom: SPACING.space_10,
    },
    CardHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
        alignItems: 'center',
    },
    HeaderTitle:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        fontWeight: 'bold',
    },
    HeaderSubtitle:{
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    PriceContainer:{
        alignItems: 'flex-end',
    },
    HeaderPrice:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        fontWeight: 'bold',
    },
    ListContainer:{
        gap: SPACING.space_20,
    },
    CardLinearGradient:{
        gap: SPACING.space_20,
        padding: SPACING.space_10,
        borderRadius: SPACING.space_20,
    },
});

export default OrderHistoryCard;


