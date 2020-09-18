import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextBold = props => {
   return <Text style={{ ...styles.text, ...props.style }}> {props.children} </Text>
}

const styles = StyleSheet.create({
    text: { fontFamily: 'open-sans-bold', fontSize: 16 }
});

export default TextBold;