import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStore } from '../store/store';

const OrderHistoryScreen = () => {

    const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);


    return(
        <View>
            <Text>Order</Text>
        </View>
    );
};

const style = StyleSheet.create({});

export default OrderHistoryScreen;


