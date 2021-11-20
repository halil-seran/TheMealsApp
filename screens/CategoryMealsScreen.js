import React from "react";
import {View ,Text ,StyleSheet,FlatList, Platform} from 'react-native';

import Colors from "../constants/Colors";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import CategoriesScreen from "./CategoriesScreen";
import MealItem from "../components/mealItem";

const CategoryMealsScreen = props => {

    const renderMealItem = itemData => {
        return (
        <MealItem title={itemData.item.title} 
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability} 
        onSelectMeal={() => {
            props.navigation.navigate({routeName:'MealDetail', params:{
                mealId: itemData.item.id
            }})
        }} /> );
    };

    const catId = props.navigation.getParam('categoryId');

    const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    return (
        <View style={styles.screen} >
            <FlatList data={displayedMeals} 
            keyExtractor={(item,index) => item.id} 
            renderItem={renderMealItem} 
            style={{width:'95%'}} />
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