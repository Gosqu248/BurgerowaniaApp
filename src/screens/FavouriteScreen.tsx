import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import { SPACING } from '../theme/theme';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import FavoritesItemCard from '../components/FavoritesItemCard';

const FavouriteScreen = ({navigation} : any) => {

    const FavoritesList = useStore((state: any) => state.FavoritesList);
    const tabBarHeight = useBottomTabBarHeight();

    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore(
      (state: any) => state.deleteFromFavoriteList,
    );

    const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };

    return(
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={'black'} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View 
                    style={[styles.ScrollViewInnerView, {marginBottom:tabBarHeight}]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Ulubione"/>

                        {FavoritesList.length == 0 ? (<EmptyListAnimation title={"Brak"}/>
                        ) : (
                           <View style={styles.ListItemContainer}> 
                                {FavoritesList.map((data: any) => (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            navigation.push('Details', {
                                                index: data.index, 
                                                id: data.id, 
                                                type: data.type
                                            });
                                        }} 
                                        key={data.id}>
                                            <FavoritesItemCard 
                                                id={data.id}
                                                name={data.name}
                                                type={data.type}
                                                imagelink_square={data.imagelink_square}
                                                favourite={data.favourite}
                                                stage={data.stage}
                                                composition={data.composition}
                                                average_rating={data.average_rating}
                                                ratings_count={data.ratings_count}
                                                ToggleFavourite={ToggleFavourite}
                                            />
                                    </TouchableOpacity>
                                ))}
                           </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default FavouriteScreen;


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
    ListItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    }
});