import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
//bu 2sini birlikte importlayıp terminale npm install --save expo-font yazıyoruz (fontun çalışması için)
//sonra expo install expo-app-loading yazıyoruz (apploading çalışması için) 
//son olarak npm install yazıyoruz (son hatayı düzeltiyoruz, eksik birkaç dosyayı yüklüyor)
import MealsNavigator from './navigation/MealsNavigator';

import {enableScreens} from 'react-native-screens';
//önce npm install --save react-native-screens yazdık
//daha büyük applerde performansı artırıyor
enableScreens();

const FetchFonts = () => {
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
    //return önemli! fontu tanımladık kodumuzda kullanıbileceğiz
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={FetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return <MealsNavigator />;
}

//react navigation için Meals Navigator componentine bakabilirsin.