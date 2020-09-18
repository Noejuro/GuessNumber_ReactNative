import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextRegular = props => {
   return <Text style={{ ...styles.text, ...props.style }}> {props.children} </Text>
}

const styles = StyleSheet.create({
    text: { fontFamily: 'open-sans', fontSize: 14 }
});

export default TextRegular;