import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import TextBold from '../components/TextFonts/TextBold'
import TextRegular from '../components/TextFonts/TextRegular'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <TextBold>The Game is Over!</TextBold>
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode="contain" source={require('../assets/success.png') } />
            </View>
            <View style={{marginHorizontal: 50}}>
                <TextRegular style={{textAlign: "center", fontSize: 18}}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></TextRegular>
            </View>
            <View style={{maxWidth: "50%", width: 200, marginTop: 20}}>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {flex: 1, justifyContent: "center", alignItems: "center"},
    imageContainer: {width: 300, height: 300, borderRadius: 150, borderWidth: 5, borderColor: "black", overflow: "hidden", marginVertical: 30},
    image: { width: "100%", height: "100%"},
    highlight: { color: Colors.primary, fontFamily: 'open-sans-bold'}
});

export default GameOverScreen;