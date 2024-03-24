import React from 'react';
import { StyleSheet, Text, View, ImageProps, ImageBackground, Touchable, TouchableOpacity} from 'react-native';
import GradientBGIcon from './GradientBGIcon';
import GradientBGIcon2 from './GradientBGIcon2';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import MaIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';


interface ImageBackgroundInfoProps {
    EnablebackHandler: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favourite: boolean;
    name: string;
    stage: string;
    composition: string;
    price: string;
    average_rating: number;
    ratings_count: string;
    BackHandler?: any;
    ToggleFavourite: any;
}


const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps>= ({
    EnablebackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    stage,
    composition,
    price,
    average_rating,
    ratings_count,
    BackHandler,
    ToggleFavourite,
}) => {
    return (
        <View>  
            <ImageBackground 
                source={imagelink_portrait} 
                style={styles.ItemBackgroundImage}>
                    {EnablebackHandler ? (
                        <View style={styles.ImageHeaderBarContainerWithBack}>
                            <TouchableOpacity onPress={() =>{
                                BackHandler();
                            }}>
                                <GradientBGIcon 
                                    name='chevron-left' 
                                    color={COLORS.primaryLightGreyHex} 
                                    size={FONTSIZE.size_16}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                ToggleFavourite(favourite, type, id);
                            }}>
                                <GradientBGIcon2 
                                    name='heart' 
                                    color={
                                        favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} 
                                    size={FONTSIZE.size_16}
                                />
                            </TouchableOpacity>
                        </View>
                    ): (
                        <View style={styles.ImageHeaderBarContainerWithoutBack}>
                            <TouchableOpacity onPress={() => {
                                ToggleFavourite(favourite, type, id);
                            }}> 
                                <GradientBGIcon2 
                                    name='heart' 
                                    color={                                        
                                        favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} 
                                    size={FONTSIZE.size_16}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={styles.ImageInfoOuterContainer}>
                        <View style={styles.ImageInfoInnerContainer}>
                            <View style={styles.InfoContainerRow}>
                                <View>
                                    <Text style={styles.ItemTitleText}>{name}</Text>
                                </View>
                                    <View style={styles.ItemPropertiesContainer}>
                                        <View style={styles.ProperFirst}>
                                            <MaIcons
                                                name='food'
                                                size={FONTSIZE.size_20}
                                                color={COLORS.primaryOrangeHex} />
                                            <Text style={styles.PropertyTextFirst}> {type} </Text>   
                                        </View>
                                    </View>
                            </View> 
                            <View style={styles.InfoContainerRow}>
                                <View style= {styles.RatingContainer}>
                                    <AntIcons 
                                        name='star'
                                        size={FONTSIZE.size_20}
                                        color={COLORS.primaryOrangeHex} 
                                    />
                                    <Text style={styles.RatingText}>{average_rating}</Text>
                                    <Text style={styles.RatingCountText}>({ratings_count})</Text>
                                </View> 
                                { type === 'Burgery' || type === 'Steki' || name.includes('Burger') ? (
                                    <View style={styles.StageContainer}>
                                         <Text style={styles.StageText}>{stage} </Text>
                                    </View> 
                                ): (
                                    <></>
                                )}   
                            </View>        
                        </View>                    
                    </View>
            </ImageBackground>
        </View>
    );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({  
    ItemBackgroundImage:{
        width: '100%',
        aspectRatio: 20/25,
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithBack:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SPACING.space_30,
        alignItems: 'center',
    },
    ImageHeaderBarContainerWithoutBack:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: SPACING.space_30,
        alignItems: 'center',
    },
    ImageInfoOuterContainer:{
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.secondaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20*2,
        borderTopRightRadius: BORDERRADIUS.radius_20*2,
    },
    ImageInfoInnerContainer:{
        justifyContent: 'space-between',
        gap: SPACING.space_15,
    },
    InfoContainerRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ItemTitleText:{
        width: 280,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_24,
        fontFamily: FONTFAMILY.poppins_medium,
        fontWeight: 'bold',
    },
    ItemPropertiesContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ProperFirst: {
        height: 65,
        width: 75,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    PropertyTextFirst: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
        fontFamily: FONTFAMILY.poppins_regular,
        textAlign: 'center',
    },
    RatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_10,
    },
    RatingText:{
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_18,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontWeight: 'bold',
    },
    RatingCountText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
        fontFamily: FONTFAMILY.poppins_regular,
    },
    StageContainer:{
        height: 55,
        width: 55*2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    StageText:{
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
        fontFamily: FONTFAMILY.poppins_regular,
    },
});