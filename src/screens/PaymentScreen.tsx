import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import GradientBGIcon from '../components/GradientBGIcon';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Fontisto';
import { useStore } from '../store/store';
import PopUpAnimation from '../components/PopUpAnimation';

const PaymentList = [
    {
        name: 'Google Pay',
        icon: require('../assets/app_images/gpay.png'),
        
    },
    {
        name: 'Apple Pay',
        icon: require('../assets/app_images/applepay.png'),
        
    },
    {
        name: 'Amazon pay',
        icon: require('../assets/app_images/amazonpay.png'),
        
    },
    {
        name: 'Płatność na miejscu!',
        icon: require('../assets/app_images/atlocal.png'),
        
    }
    
];

const PaymentScreen = ({navigation, route}:any) => {

    const [paymentMode, setPaymentMode] = useState('Karta Kredytowa');

    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const addToOrderHistoryListFromCart = useStore((state: any) => state.addToOrderHistoryListFromCart);

    const [showAnimation, setShowAnimation] = useState(false);

    const buttonPressHandler = () => {
        setShowAnimation(true);
        addToOrderHistoryListFromCart();
        calculateCartPrice();
        setTimeout(() => { 
            setShowAnimation(false);
            navigation.navigate('History');
        }, 2000)
    }

    return(
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={'black'} />

            {showAnimation 
                ? (<PopUpAnimation
                    style={styles.LottieAnimation}
                    source={require('../lottie/successful.json')}
                />
                ): (<></>
            )}

            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.HeaderContainer}>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.pop();
                        }}>
                        <GradientBGIcon 
                            name='chevron-left' 
                            color={COLORS.primaryLightGreyHex} 
                            size={FONTSIZE.size_16}
                        />
                    </TouchableOpacity>
                    <Text style={styles.HeaderText}> Płatności</Text>
                    <View style={styles.EmptyView}/>
                </View>
                <View style={styles.PaymentOptionsContainer}>
                    <TouchableOpacity onPress={() => {
                        setPaymentMode('Karta Kredytowa');
                    }}>
                        <View 
                            style={[styles.CreditCardContainer,{
                                borderColor: 
                                paymentMode == "Karta Kredytowa" 
                                ? COLORS.primaryOrangeHex
                                : COLORS.primaryGreyHex,
                            },
                        ]}>
                            <Text style={styles.CreditCardTitle}> Karta Kredytowa</Text>
                            <View style={styles.CreditCardBG}>
                                <LinearGradient
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 1}}
                                    style={styles.LinearGradientStyle}
                                    colors={[
                                        COLORS.primaryGreyHex,
                                        COLORS.primaryBlackHex,
                                    ]}>
                                      <View style={styles.CreditCardRow}>
                                        <Image 
                                            source={require('../assets/app_images/chip.png')} 
                                            style={styles.ChipImage}/>
                                        <Image 
                                            source={require('../assets/app_images/visa.png')} 
                                            style={styles.VisaImage}/>
                                      </View>
                                      <View style={styles.CreditCardNumberContainer}>
                                            <Text style={styles.CreditCardNumber}>3141</Text>
                                            <Text style={styles.CreditCardNumber}>5926</Text>
                                            <Text style={styles.CreditCardNumber}>5358</Text>
                                            <Text style={styles.CreditCardNumber}>9793</Text>
                                      </View>
                                      <View style={styles.CreditCardRow}>
                                        <View>
                                            <Text style={styles.CreditCardNameSubtitle}></Text>
                                            <Text style={styles.CreditCardNameTitle} >Jan Kowalski</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.CreditCardNameSubtitle}>Valid thru</Text>
                                            <Text style={styles.CreditCardNameTitle}>12/23</Text>
                                        </View>
                                      </View>
                                </LinearGradient>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {PaymentList.map((data:any) => (
                        <TouchableOpacity
                            key={data.name}
                            onPress={() => {setPaymentMode(data.name)}}
                            >
                            <PaymentMethod 
                             paymentMode={paymentMode}
                             name={data.name}
                             icon={data.icon} 
                             />
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
            <PaymentFooter 
                buttonTitle='Zapłać'
                title='Lącznie:'
                price={route.params.amount}    
                buttonPressHandler={buttonPressHandler}
                />
        </View>
    );
};

export default PaymentScreen;


const styles = StyleSheet.create({
    ScreenContainer:{
        flex:1,
        backgroundColor: 'black',
    },
    LottieAnimation:{
        flex: 1,
    },
    ScrollViewFlex:{
        flexGrow: 1,
    },
    HeaderContainer:{
        paddingHorizontal: SPACING.space_24,
        paddingVertical: SPACING.space_15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
    },
    EmptyView:{
        height: SPACING.space_36,
        width: SPACING.space_36,
    },
    PaymentOptionsContainer:{
        padding: SPACING.space_15,
        gap: SPACING.space_15,
    },
    CreditCardContainer:{
        padding: SPACING.space_10,
        gap: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_15*2,
        borderWidth: 3,
    },
    CreditCardTitle:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginLeft: SPACING.space_10,
        fontWeight: 'bold',
    },
    CreditCardBG:{
        backgroundColor: COLORS.primaryGreyHex,
        borderRadius: BORDERRADIUS.radius_25,
    },
    LinearGradientStyle:{
        gap: SPACING.space_36,
        borderRadius: BORDERRADIUS.radius_25,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_10,
    },
    CreditCardRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    CreditCardNumberContainer:{
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    ChipImage:{
        width: 50,
        height: 50,
    },
    VisaImage:{
        width: 70,
        height: 30, 
    },
    CreditCardNumber:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
        letterSpacing: SPACING.space_4 + SPACING.space_2,
        fontWeight: 'bold',
    },
    CreditCardNameTitle:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_4,
    },
    CreditCardNameSubtitle:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryLightGreyHex,
    },
});