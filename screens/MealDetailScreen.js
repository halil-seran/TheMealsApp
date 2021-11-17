import React from "react";
import {View ,Text ,StyleSheet,Button} from 'react-native';

const MealDetailScreen = props => {
    return (
        <View style={styles.screen} >
            <Text>
            MealDetailScreen!
            </Text>
            <Button title='go to main page' onPress={() => {
                props.navigation.popToTop(); //popToTop stackteki tüm screenleri kaldırır, parent screen kalır
            }} />
        </View>
    );
};
const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default MealDetailScreen;