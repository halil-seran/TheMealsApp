import React from "react";
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';

import Colors from "../constants/Colors";
import { CATEGORIES} from "../data/dummy-data";
import CategoriesScreen from "./CategoriesScreen";
import MealItem from "../components/mealItem";
import MealList from '../components/MealList';

import { useSelector } from 'react-redux';

const CategoryMealsScreen = props => {

    const catId = props.navigation.getParam('categoryId');

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
      );

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

});

export default CategoryMealsScreen;