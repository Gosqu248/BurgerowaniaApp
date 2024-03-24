import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';

const CartScreen = () => {

    const CartList = useStore((state: any) => state.CartList);
    const CartPrice = useStore((state: any) => state.CartPrice);

    const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity);
    const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity);

    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const tabBarHeight = useBottomTabBarHeight();

    return(
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={'black'} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View 
                    style={styles.ScrollViewInnerView}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Cart"/>
                        
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default CartScreen;


const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    ScrollViewFlex:{
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex : 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
       flex: 1,
    },
});
