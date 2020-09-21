import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../constants/colors'

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: { backgroundColor: Colors.primary, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
    buttonText: { color: "white", fontFamily: "open-sans", fontSize: Dimensions.get("window").height < 600 ? 12 : 18 , textAlign: "center" }
});

export default MainButton