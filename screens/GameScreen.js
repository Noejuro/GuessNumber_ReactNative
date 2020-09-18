import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import MainButton from '../components/MainButton'
import TextRegular from '../components/TextFonts/TextRegular'
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import Colors from '../constants/colors'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem} >
        <TextRegular>#{numOfRound}</TextRegular>
        <TextRegular>{value}</TextRegular>
    </View>
)

const GameScreen = props => {
    const initialGuess =  generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState( initialGuess );
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver] );

    const nextGuessHandler = direction => {
        if( (direction === "lower" && currentGuess < props.userChoice) || (direction === "greater" && currentGuess > props.userChoice) ) {
            Alert.alert("Don\'t lie!", "You know that this is wrong...", [ {text: "Sorry", style: "cancel" } ] );
            return;
        }
        if(direction === "lower"){
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(currPastGuesses => [nextNumber,...currPastGuesses] );
    }



    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}> <Ionicons name="md-remove" size={24} color="white" /> </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}> <Ionicons name="md-add" size={24} color="white" /> </MainButton>
            </Card>
            <View style={{width: 300, maxWidth: "80%", flex: 1 }}>
                <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index) )}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, padding: 10, alignItems: "center"},
    buttonContainer: { flexDirection: "row", justifyContent: "space-around", marginTop: 20, width: 300, maxWidth: "80%" },
    listItem: { borderColor: Colors.primary, borderWidth: 2, padding: 15, marginVertical: 5, backgroundColor: "white", flexDirection: "row", justifyContent: "space-around" }
});

export default GameScreen;