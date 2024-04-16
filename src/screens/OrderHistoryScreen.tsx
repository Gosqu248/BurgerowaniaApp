import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { useStore } from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistoryScreen = ({navigation}: any) => {

    const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
    const tabBarHeight = useBottomTabBarHeight();
    const [showAnimation, setShowAnimation] = useState(false);

    const navigationHandler = ({index, id, type}: any) => {
        navigation.push('Details', {
            index: index,
            id: id,
            type: type,
        });
    }

    const buttonPressHandler = () => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 2000);
    };

    return(
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={'black'} />

            {showAnimation ? (
                <PopUpAnimation
                    style={styles.LottieAnimation}
                    source={require('../lottie/download.json')}
                />
                ): (<></>
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                    <View
                        style={[
                            styles.ScrollViewInnerView,
                            {marginBottom: tabBarHeight},
                        ]}>
                        <View style={styles.ItemContainer}>
                            <HeaderBar title="Historia Zamówień"/>

                            {OrderHistoryList.length == 0 ? (
                                <EmptyListAnimation title={"Brak zrealizowanych zamówień"} animationNumber={3}/>
                            ) : (
                                <View style={styles.ListItemContainer}>
                                    {OrderHistoryList.map((data: any, index: any) => (
                                        <OrderHistoryCard 
                                            key={index.toString()}
                                            navigationHandler={navigationHandler}
                                            CartList={data.CartList}
                                            CartListPrice={data.CartListPrice}
                                            OrderDate={data.OrderDate}
                                         />
                                    ))}
                                </View>
                            )}
                        </View>
                        {OrderHistoryList.length > 0 ? (
                            <TouchableOpacity 
                                style={styles.DownlaodButton}
                                onPress={() => {
                                    buttonPressHandler();
                                }}>

                                <Text style={styles.ButtonText}> Pobierz historię</Text>
                            </TouchableOpacity>
                           ) : (
                            <></>
                        )}
                    </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    LottieAnimation:{
        height: 250,
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
    ListItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
    DownlaodButton:{
        margin: SPACING.space_20,
        backgroundColor: COLORS.primaryOrangeHex,
        justifyContent: 'center',
        alignItems: 'center',
        height: SPACING.space_36 * 2,
        borderRadius: SPACING.space_20,
    },
    ButtonText:{
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_18,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontWeight: 'bold',
    },
});

export default OrderHistoryScreen;


