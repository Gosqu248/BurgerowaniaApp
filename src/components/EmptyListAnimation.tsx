import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyListAnimationProps {
    title: string;
    animationNumber: number;
}


const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({
    title,
    animationNumber,
}) => {
    return(
        <View style={styles.EmptyCartContainer}>
        {animationNumber == 1 ? (<LottieView 
                style={styles.LottieStyle}
                source={require('../lottie/noCard.json')}
                autoPlay={true} 
                loop={true} 
                speed={1} 
                resizeMode="cover" 
            />
        ) : animationNumber == 2 ?(
            <LottieView 
                style={styles.LottieStyle}
                source={require('../lottie/noFav.json')}
                autoPlay={true} 
                loop={true} 
                speed={1} 
                resizeMode="cover" 
            />
        ) : (
            <LottieView 
                style={styles.LottieStyle}
                source={require('../lottie/noOrder.json')}
                autoPlay={true} 
                loop={true} 
                speed={1} 
                resizeMode="cover" 
            />
            )}

            <Text style={styles.Text}>{title}</Text>
        </View>
    );
};

export default EmptyListAnimation;


const styles = StyleSheet.create({
    EmptyCartContainer:{
        flex: 1,
        justifyContent: 'center',
    },
    LottieStyle:{
        height: 300,
    },
    Text:{
        color: 'grey',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 40,
        fontWeight: 'bold',
    }
});