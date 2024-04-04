import React from 'react';
import { StyleSheet, Image, View, ImageProps, Text } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';

interface FavoritesItemCardProps {
    id: string;
    name: string;
    type: string;
    imagelink_square: ImageProps;
    favourite: boolean; 
    stage: string;
    composition: string; 
    average_rating: number
    ratings_count: string;
    ToggleFavourite: any;
}


const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
    id,
    name,
    type,
    imagelink_square,
    favourite,
    stage,
    composition,
    average_rating,
    ratings_count,
    ToggleFavourite,
}) => {
    return(
        <View style={styles.CardContainer}>
            <ImageBackgroundInfo 
                imagelink_portrait={imagelink_square}
                type={type}
                id={id}
                composition={composition} 
                favourite={favourite}
                name={name}
                stage={stage}
                average_rating={average_rating}
                ratings_count={ratings_count}
                ToggleFavourite={ToggleFavourite} 
                EnablebackHandler={false} 
                />
            <LinearGradient
            start={{x:0, y:0}}
            end={{x:1, y:1}}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style= {styles.ContainerLinearGradient} >    
               <Text style={styles.CompositionTitle}> Skład: </Text>  
               <Text style={styles.CompositionText}> {composition}</Text>  

            </LinearGradient>
        </View>
    );
};
const styles = StyleSheet.create({
    CardContainer:{
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden',
    },
    ContainerLinearGradient:{
        gap: SPACING.space_10,
        padding: SPACING.space_20,
    },
    CompositionTitle:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex,
        lineHeight: SPACING.space_28,

    },
    CompositionText:{
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        lineHeight: SPACING.space_24,

    },
});

export default FavoritesItemCard;


