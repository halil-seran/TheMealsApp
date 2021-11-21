import React from "react";
import {View ,Text ,StyleSheet,Button} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; // headerButtons !! s var

import { MEALS } from "../data/dummy-data";
import HeaderButton from '../components/HeaderButton';

const MealDetailScreen = props => {

    const mealId = props.navigation.getParam('mealId');

    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    return (
        <View style={styles.screen} >
            <Text>
            {selectedMeal.title}
            </Text>
            <Button title='go to main page' onPress={() => {
                props.navigation.popToTop(); //popToTop stackteki tüm screenleri kaldırır, parent screen kalır
            }} />
        </View>
    );
};

MealDetailScreen.navigationOptions = navigationData => {
    const mealId = navigationData.navigation.getParam('mealId');
    const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return {
      headerTitle: selectedMeal.title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Favorite"
            iconName="ios-star"
            onPress={() => {
              console.log('okndu moruk');
            }}
          />
        </HeaderButtons> //setup is cumbersome but after setup just copy it any component
      )
    }
  };

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default MealDetailScreen;