import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStore } from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const FavouriteScreen = ({navigation} : any) => {

    const FavouriteList = useStore((state: any) => state.FavouriteList);
    const tabBarHeight = useBottomTabBarHeight();

    return(
        <View>
            <Text>Fav</Text>
        </View>
    );
};

export default FavouriteScreen;


const style = StyleSheet.create({});