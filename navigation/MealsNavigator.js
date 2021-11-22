//react navigation için reactnavigation.org dan version 4 ü takip edebiliriz
//projeyi durdurup npm den şunu yükledik expo install react-native-gesture-handler react-native-reanimated 
//react-native-screens react-native-safe-area-context @react-native-community/masked-view 
// sonra bunu yazıyoruz npm install --save react-navigation-stack
//Also add this import in the file where you are using createStackNavigator:
//import { createStackNavigator } from 'react-navigation-stack';
//Same for TabsNavigator 
//npm install --save react-navigation-tabs
//import { createBottomTabNavigator } from 'react-navigation-tabs';
//And also for DrawerNavigator 
//npm install --save react-navigation-drawer
//import { createDrawerNavigator } from 'react-navigation-drawer';
//pageler öncekinin üzerine stacklenir. last in first out
//apploading hatası için app.js return altında onError={(err) => console.log(err)} yazıyoruz 

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
//npm install --save react-native-paper
//npm install --save react-navigation-material-bottom-tabs

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

import { Platform } from 'react-native';
import Colors from '../constants/Colors';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor
}

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen
  },
  CategoryMeals: {
    screen: CategoryMealsScreen
    /*navigationOptions:{
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor */
    //bunları amele gibi her screen e yazmak yerine bir kere buraya yazıyoruz ama bu şekilde de buradaki her screene ayrı ayrı yazmamız gerekiyor
  },
  MealDetail: MealDetailScreen
  //bunlar bizim route name lerimiz
},
  {
    //mode:'modal', modal olur
    //initialRouteName:'MealDetail', başlangıç sayfasını ayarlar, daha fazlası için official docs.
    defaultNavigationOptions: defaultStackNavOptions
    /*{
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor 
    }//bu şekilde yaparsak tek seferde tüm screenlere yazmış oluyoruz
    //eğer screenden screen e farklılık varsa ayrı ayrı yazılabilir yukardaki gibi
    //yukardaki screenlere ayrıca yazabiliriz o zaman bu yani default olan override olur.
    //YUKARDAKİ SCREENLER > COMPONENT SCREENLER > DEFAULT */
  }
);

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
},
  {
    //initialRouteName: 'categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator, navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name='ios-restaurant'
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavNavigator, navigationOptions: {
      tabBarLabel: 'Favorites!',
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name='ios-star'
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: 'black'
    }
  }
}

const MealsFavTabNavigator = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: Colors.accentColor,
    shifting: true//,
    //barStyle:{
    //backgroundColor: color  => eğer shifting effecti istemiyorsak tabBarColor Tabın rengini değiştirmiyor
    //}                                dolayısıyle bu şekilde tabBarın colorını değiştirebiliyoruz
  })
  : createBottomTabNavigator(
    tabScreenConfig,
    {
      tabBarOptions: {
        activeTintColor: Colors.accentColor
      }
    });

const FilterNavigator = createStackNavigator({
  Filters: FiltersScreen
},
  {
    //navigationOptions:{
    //  drawerLabel:''
    // },
    defaultNavigationOptions: defaultStackNavOptions
  });

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator, navigationOptions: {
      drawerLabel: 'Meals',

    }
  },
  Filters: FilterNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans'
    },
    itemsContainerStyle: {
      marginTop: 40,
      flex: 1
    },
  },
  drawerType: 'slide',
  drawerWidth: 200,
});

export default createAppContainer(MainNavigator);

/*When defining a navigator, you can also add navigationOptions to it:

const SomeNavigator = createStackNavigator({
  ScreenIdentifier: SomeScreen
}, {
  navigationOptions: {
      // You can set options here!
      // Please note: This is NOT defaultNavigationOptions!
  }
});
Don't mistake this for the defaultNavigationOptions
which you could also set there (i.e. in the second argument you pass to createWhateverNavigator()).

The navigationOptions you set on the navigator will NOT be used in its screens!
That's the difference to defaultNavigationOptions - those option WILL be merged with the screens.

So what's the use of navigationOptions in that place then?

The options become important once you use the navigator itself as a screen in some other navigator -
for example if you use some stack navigator (created via createStackNavigator()) in a tab navigator
(e.g. created via createBottomTabNavigator()).

In such a case, the navigationOptions configure the "nested navigator" (which is used as a screen)
for that "parent navigator". For example, you can use navigationOptions on the nested navigator
that's used in a tab navigator to configure the tab icons.
*/