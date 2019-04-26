import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const GrayBlank = () => (
    <View style={styles.grayblank}></View>
)

const styles = StyleSheet.create({
    grayblank: {
        width: '100%',
        height: 15,
        backgroundColor: '#eee'
    }
})

export default GrayBlank;