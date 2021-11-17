import React from "react";
import {View ,Text ,StyleSheet, Button , FlatList , TouchableOpacity, Touchable , Platform} from 'react-native';

import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";

const CategoriesScreen = props => {

    const renderGridItem = (itemData) => {
        return (
            <TouchableOpacity  style={styles.gridItem}
                onPress={() => {
                props.navigation.navigate({routeName: 'CategoryMeals', params: {
                    categoryId: itemData.item.id
                }})
                //bu special bir prop // navigate('CategoryMeals'{CategoryId:YOUR-DATA}) şeklinde de yazılabilir
                //push('CategoryMeals') da yazılabilir push aynı ekranın tekrar yüklenmesi sağlar (dropbox)
                //...replace('CategoryMeals') yer değiştirir o ekrana artık ulaşılamaz login screen örnek
            }} >
                <View>
                    <Text>
                        {itemData.item.title}
                    </Text>
                </View> 
            </TouchableOpacity>
        );
    };

    return (
        <FlatList keyExtractor={(item,index) => item.id} //rn eski versionarı için 
        data={CATEGORIES} 
        renderItem={renderGridItem}
        numColumns={2} /> //default 1, yanyana 2 coloum gözüksün diye
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
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    gridItem:{
        flex:1,
        margin:10,
        height:164
    }
});

export default CategoriesScreen;
