import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
//npm install --save react-navigation-header-buttons@6 ı yükledik 
//navigationOptions dan title koyduğumuz gibi iconlu ve yazılı button da koyabilirdik lakin 
//her ekran boyutu için tekrar tekrar ayarlamak gerekiyor. bu şekilde çok daha kolay ve pratik
// header button !!! s yok

import { Ionicons } from '@expo/vector-icons';
//npm install --save @expo/vector-icons u yükledik
//iconlar ionicons olmak zorunda değil ya expo yada reactin alt iconlarından olmak zorunda (header icon için)

import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton {...props} //forward all props / with this shortcut by pulling out all the key-value pairs and passing them to this object
      IconComponent={Ionicons}
      iconSize={27}
      color={Platform.OS === 'android' ? '#fb8022' : Colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;