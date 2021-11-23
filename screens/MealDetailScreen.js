import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; // headerButtons !! s var

import { MEALS } from "../data/dummy-data";
import HeaderButton from '../components/HeaderButton';

import DefaultText from "../components/DefaultText";

const ListItem = props => {
  return (
    <View style={styles.listItem} >
      <DefaultText>- {props.children}</DefaultText>
    </View>
  );  
};

const MealDetailScreen = props => {

  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return (
    <ScrollView>
      <Image source={{uri:selectedMeal.imageUrl}} style={styles.image} />
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
            console.log('');
          }}
        />
      </HeaderButtons> //setup is cumbersome but after setup just copy it any component
    )
  }
};

const styles = StyleSheet.create({
  image:{
    width:'100%',
    height:211
  },
  details:{
    flexDirection:'row',
    padding:16,
    justifyContent:'space-around'
  },
  title:{
    fontFamily:'open-sans-bold',
    fontSize:23,
    textAlign:'center',
    color:'red'
  },
  listItem:{
    marginVertical:3,
    marginHorizontal:19,
    borderColor:'#656565',
    borderWidth:1.3,
    padding:11,
    borderRadius:12
  }
});

export default MealDetailScreen;