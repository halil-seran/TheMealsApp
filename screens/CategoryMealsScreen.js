import React from "react";
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';

import Colors from "../constants/Colors";
import { CATEGORIES } from "../data/dummy-data";
import CategoriesScreen from "./CategoriesScreen";
import MealItem from "../components/mealItem";
import MealList from '../components/MealList';

import { useSelector } from 'react-redux';
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = props => {

    const catId = props.navigation.getParam('categoryId');

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>
                    No meals found, maybe check your filters?
                </DefaultText>
            </View>
        );
    }

    return <MealList listData={displayedMeals} navigation={props.navigation} />;
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

const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default CategoryMealsScreen;