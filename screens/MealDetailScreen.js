import React, { useEffect, useCallback } from "react"; // usecallback for infinite loops
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; // headerButtons !! s var

// import { MEALS } from "../data/dummy-data";
import HeaderButton from '../components/HeaderButton';

import DefaultText from "../components/DefaultText";

import { useSelector, useDispatch } from "react-redux";

import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem} >
      <DefaultText>- {props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {

  const availableMeals = useSelector(state => state.meals.meals);

  const mealId = props.navigation.getParam('mealId');

  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    //props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect (() => {
    props.navigation.setParams({isFav: currentMealIsFavorite})
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title} >Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (<ListItem key={ingredient}>{ingredient}</ListItem>))}
      <Text style={styles.title} >Steps</Text>
      {selectedMeal.steps.map(step => (<ListItem key={step}>{step}</ListItem>))}
    </ScrollView>
  );  //ingredients ve steps leri bu şekilde çağırdık çünkü onlar array
};

MealDetailScreen.navigationOptions = navigationData => {
  // const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');
  //const selectedMeal = MEALS.find(meal => meal.id === mealId);
  
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons> //setup is cumbersome but after setup just copy it any component
    )
  }
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 211
  },
  details: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 23,
    textAlign: 'center',
    color: 'red'
  },
  listItem: {
    marginVertical: 3,
    marginHorizontal: 19,
    borderColor: '#656565',
    borderWidth: 1.3,
    padding: 11,
    borderRadius: 12
  }
});

export default MealDetailScreen;