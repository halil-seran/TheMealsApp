//react navigation için reactnavigation.org dan version 4 ü takip edebiliriz
//projeyi durdurup npm den şunu yükledik expo install react-native-gesture-handler react-native-reanimated 
//react-native-screens react-native-safe-area-context @react-native-community/masked-view 
// sonra bunu yazıyoruz npm install --save react-navigation-stack
//Also add this import in the file where you are using createStackNavigator:
//import { createStackNavigator } from 'react-navigation-stack';
//Same for TabsNavigator (used a little bit later in this module):
//npm install --save react-navigation-tabs
//import { createBottomTabNavigator } from 'react-navigation-tabs';
//And also for DrawerNavigator (also used later in this module):
//npm install --save react-navigation-drawer
//import { createDrawerNavigator } from 'react-navigation-drawer';
//pageler öncekinin üzerine stacklenir. last in first out
//apploading hatası için app.js return altında onError={(err) => console.log(err)} yazıyoruz 

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from "react-navigation";

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

import { Platform } from 'react-native';
import Colors from '../constants/Colors';


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
    defaultNavigationOptions:{
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor 
      }//bu şekilde yaparsak tek seferde tüm screenlere yazmış oluyoruz
      //eğer screenden screen e farklılık varsa ayrı ayrı yazılabilir yukardaki gibi
      //yukardaki screenlere ayrıca yazabiliriz o zaman bu yani default olan override olur.
      //YUKARDAKİ SCREENLER > COMPONENT SCREENLER > DEFAULT 
  }
  );
  
  export default createAppContainer(MealsNavigator);
