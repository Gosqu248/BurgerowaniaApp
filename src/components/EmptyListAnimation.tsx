import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyListAnimationProps {
    title: string;
}


const EmptyListAnimation: React.FC<EmptyListAnimationProps> = () => {
    return(
        <View style={styles.EmptyCartContainer}>
            <LottieView 
                style={styles.LottieStyle}
                source={require('../lottie/coffecup.json')}
                autoPlay={true} 
                loop={true} 
                speed={1} 
                resizeMode="cover" 
            />
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
});