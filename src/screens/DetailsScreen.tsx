import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { useStore } from '../store/store';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { StatusBar } from 'react-native';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({navigation, route}: any) => {

    const ItemOfIndex = useStore((state: any) =>
     route.params.type === 'Burgery' ? state.BurgerList :
     route.params.type === 'Pizza 30cm' ? state.PizzaList:
     route.params.type === 'Zapiekanki' ? state.ZapiekankiList : 
     route.params.type === 'Steki' ? state.StekiList :
     route.params.type === 'Kebaby' ? state.KebabyList :
     route.params.type === 'Kids' ? state.KidsList :
     route.params.type === 'Sałatki' ? state.SalatkiList :
     route.params.type === 'Napoje' ? state.NapojeList :
     route.params.type === 'Tego musisz spróbować' ? state.MustTasteList :
     route.params.type === 'Dodatki' ? state.DodatkiList : state.SosyList ,
    )[route.params.index];

    const BackHandler = () => {
        navigation.pop();   
    };

    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore(
      (state: any) => state.deleteFromFavoriteList,
    );

    const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };

    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

    const addToCartHandler = ({
        id, 
        index, 
        name, 
        stage, 
        imagelink_square, 
        composition,
        type,
        price,
    
    }: any) => {
        addToCart({
            id, 
            index, 
            name, 
            stage, 
            imagelink_square, 
            composition,
            type,
            price,
        });
        calculateCartPrice();
        navigation.navigate('Cart');
    };
    
    return(
        <View style={styles.ScreenContainer}>
            <StatusBar  backgroundColor={'black'} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <ImageBackgroundInfo 
                    EnablebackHandler={true}
                    imagelink_portrait={ItemOfIndex.imagelink_portrait} 
                    type={ItemOfIndex.type} 
                    id={ItemOfIndex.id} 
                    favourite={ItemOfIndex.favourite} 
                    name={ItemOfIndex.name} 
                    stage={ItemOfIndex.stage} 
                    composition={ItemOfIndex.composition} 
                    price={ItemOfIndex.price} 
                    average_rating={ItemOfIndex.average_rating}
                    ratings_count={ItemOfIndex.ratings_count} 
                    BackHandler={BackHandler}
                    ToggleFavourite={ToggleFavourite}             
                />

                <View style={styles.footerInfoArea}>
                    <Text style={styles.InfoTitle}>Skład :</Text>
                     <Text numberOfLines={4} style={styles.DescriptionText}> {ItemOfIndex.composition}</Text>
                </View>

                <PaymentFooter 
                    price={ItemOfIndex.price} 
                    buttonPressHandler={() => {
                        addToCartHandler({
                            id: ItemOfIndex.id, 
                            index: route.params.index, 
                            name: ItemOfIndex.name, 
                            stage: ItemOfIndex.stage, 
                            imagelink_square: ItemOfIndex.imagelink_square, 
                            composition: ItemOfIndex.composition,
                            type: ItemOfIndex.type,
                            price: ItemOfIndex.price,
                        
                        })
                    }} 
                    buttonTitle={'Dodaj do koszyka'}/>

            </ScrollView>
        </View>
    );
};

export default DetailsScreen;


const styles = StyleSheet.create({
    ScreenContainer:{
        flex: 1,
        backgroundColor: 'black',
    },
    ScrollViewFlex:{ 
        flexGrow: 1,
    },
    footerInfoArea:{
        padding: SPACING.space_36,
    },
    InfoTitle:{
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_20,
        marginBottom: SPACING.space_10,
        fontWeight: 'bold',
    },
    DescriptionText:{
        letterSpacing: 0.7,
        fontFamily: FONTFAMILY.poppins_regular,
        textAlign: 'left',
        lineHeight: SPACING.space_28,
        marginBottom: SPACING.space_20,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_18,
    },
});