import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import Colors from '../constants/colors'
import TextBold from '../components/TextFonts/TextBold'
import TextRegular from '../components/TextFonts/TextRegular'

const StartGameScreen = props => {

    const [enteredValue, setEnteredeValue] = useState('')
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler =  inputText => {
        setEnteredeValue( inputText.replace(/[^0-9]/g, '') );
    };

    const resetInputHanlder = () => {
        setConfirmed(false);
        setEnteredeValue("");
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert("Invalid Number!", "Number has to be a number between 1 and 99", [{text: "Okay", style: "destructive", onPress: resetInputHanlder} ] );
            setConfirmed(false);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(chosenNumber));
        setEnteredeValue("");
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text> You selected </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber) } />
            </Card>
        );
    }

    return ( 
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <TextBold style={styles.title}>Start a New Game!</TextBold>
                <Card style={styles.inputContainer}>
                    <TextRegular>Select the Number</TextRegular>
                    <Input style={styles.input} onChangeText={numberInputHandler} value={enteredValue} blurOnSubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLength={2} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button  color={Colors.accent} title="Reset" onPress={ resetInputHanlder } />
                        </View>
                        <View style={styles.button}>
                            <Button color={Colors.primary} title="Confirm" onPress={ confirmInputHandler } />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, padding: 10, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 20, marginVertical: 10, fontFamily: 'open-sans-bold' },
    inputContainer: { width: 300, maxWidth: "80%", alignItems: "center" },
    buttonContainer: { flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 15 },
    button: { width: "45%" },
    input: { width: 35, textAlign: "center", marginBottom: 20, fontSize: 20 },
    summaryContainer: { marginTop: 20, alignItems: "center", width: 200, maxWidth: "60%" }
});

export default StartGameScreen;