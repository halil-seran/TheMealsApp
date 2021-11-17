import React from "react";
import {View ,Text ,StyleSheet,Button, Platform} from 'react-native';

import Colors from "../constants/Colors";
import { CATEGORIES } from "../data/dummy-data";
import CategoriesScreen from "./CategoriesScreen";

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return (
        <View style={styles.screen} >
            <Text>
              CategoryMealsScreen!
            </Text>
            <Text>{selectedCategory.title}</Text>
            <Button title='go to meal detail screen' onPress={() => {
                props.navigation.navigate('MealDetail')
            }} />
            <Button title='Go Back' onPress={() => {
                props.navigation.goBack();
                //props.navigation.pop(); aynısı
            }}  />
        </View>
    );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
       /* headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor */
    };
};
//caterogies screen deki gibi statik şekilde yazamıyoruz çünkü buradan yukardaki blok içindeki selectedcategory e ulaşamıyoruz
//bu yüzden dinamik bir fonksiyon yazıyoruz ve react navigationın özelliğini kullanıyoruz

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default CategoryMealsScreen;