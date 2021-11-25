import React from "react";
import MealList from "../components/MealList";

//import { MEALS } from "../data/dummy-data"; artık storu kullanıyoruz

import { useSelector } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../components/HeaderButton'; //!! parantez yok

import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = props => {

    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>
                    No favorite meals found. Start adding some!
                </DefaultText>
            </View>
        );
    }

   // const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2'); dummy data before store

    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    );
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => (
            <HeaderButtons
                HeaderButtonComponent={HeaderButton}
            >
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});


export default FavoritesScreen;