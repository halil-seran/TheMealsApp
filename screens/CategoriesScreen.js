import React from "react";
import {View ,Text ,StyleSheet, Button , FlatList , TouchableOpacity, Touchable , Platform} from 'react-native';

import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";
import CategoryGridTile from "../components/CategoryGridTile";
import { color } from "react-native-reanimated";

const CategoriesScreen = props => {
    const renderGridItem = itemData => {
        return (
          <CategoryGridTile
            title={itemData.item.title} 
            color={itemData.item.color}
            onSelect={() => {
                props.navigation.navigate({routeName: 'CategoryMeals', params: {
                    categoryId: itemData.item.id
                  }
                });
            //bu special bir prop // navigate('CategoryMeals'{CategoryId:YOUR-DATA}) şeklinde de yazılabilir
            //push('CategoryMeals') da yazılabilir push aynı ekranın tekrar yüklenmesi sağlar (dropbox)
            //...replace('CategoryMeals') yer değiştirir o ekrana artık ulaşılamaz login screen örnek
            }}
          />
        );
    };

    return (
        <FlatList keyExtractor={(item,index) => item.id} //rn eski versionarı için 
        data={CATEGORIES}
        renderItem={renderGridItem}
        numColumns={2} > //default 1, yanyana 2 coloum gözüksün diye
        </FlatList>
    );
};

CategoriesScreen.navigationOptions = {
    headerTitle: 'Meal Categories',
   /* headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor  */
}//header ve daha fazla stillendirmeyi bu şekilde yapabiliyoruz daha fazlası için offical docs

const styles=StyleSheet.create({
    
});

export default CategoriesScreen;
