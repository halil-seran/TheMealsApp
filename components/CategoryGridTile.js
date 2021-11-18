import React from "react";
import {TouchableOpacity, Text, View, StyleSheet, Platform,TouchableNativeFeedback, TouchableNativeFeedbackBase } from 'react-native';

const CategoryGridTile = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem} //Androidde dokunma efekti bozuluyor düzeltmek için bir kezdefa view içerine alıyoruz
        > 
        <TouchableCmp  style={{flex:1}}
            onPress={props.onSelect} //bu categoryscreendeki on selecti trigger lıyor 
        >
            <View style={{...styles.container, ...{backgroundColor: props.color}}} >
                <Text style={styles.title} numberOfLines={2} >
                    {props.title}
                </Text>
            </View> 
        </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem:{
        flex:1,
        margin:10,
        height:164,
        borderRadius:30,
        overflow:'hidden' // dokunma efekti yuvarlak köşelerden taşmasın diye
    },
    container:{
        flex:1,
        borderRadius:30,
        shadowColor:'black',
        shadowOpacity: 0.3,
        shadowOffset:{width:0, height:2},
        shadowRadius:11,
        elevation:8,
        padding:17,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:16,
        textAlign:'right'//this is for android ,numOfLines sola atıyor yazıyı bunla tekrar sağa çekiyoruz
    }
});

export default CategoryGridTile;
