import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../components/HeaderButton'; //!! parantez yok
import { useDispatch } from "react-redux";
import { setFilters } from '../store/actions/meals'

import Colors from "../constants/Colors";

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ false: '#ccc', true: Colors.accentColor }}
                thumbColor={Platform.OS === 'android' ? Colors.accentColor : ''}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    );
};

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
          glutenFree: isGlutenFree,
          lactoseFree: isLactoseFree,
          vegan: isVegan,
          vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters));
        
    }, [ isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label="Gluten-free"
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label="Lactose-free"
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label="Vegan"
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                label="Vegetarian"
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
        </View>
    );
};
FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
            <HeaderButtons
                HeaderButtonComponent={HeaderButton}
            >
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons
                HeaderButtonComponent={HeaderButton}
            >
                <Item title="Save" iconName='ios-save'
                    onPress={navData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '140%',
        marginVertical: 11
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});

export default FiltersScreen

/*
[React Refresher] useEffect() & useCallback()
In case you never heard about useCallback() and useEffect(), I strongly recommend that you dive into some basic React resources (like my "Complete Guide" course) first!

Also check out the official docs:

React in general: https://reactjs.org/docs/getting-started.html

useEffect(): https://reactjs.org/docs/hooks-reference.html#useeffect

useCallback(): https://reactjs.org/docs/hooks-reference.html#usecallback

Short Summary

useEffect()

useEffect() is a so called React Hook (learn more) which allows you to handle side effects in your functional (!) React components.

You can use it to do anything that doesn't directly impact your UI/ JSX code (it might eventually impact it, for example if you're fetching data from some server, but for the current render cycle, it will not).

useEffect() allows you to register a function which executes AFTER the current render cycle.

In the previous lecture, we use that to set new navigation params for this screen (= for this component).

useEffect() runs after every render cycle (i.e. whenever your functional component re-runs/ re-renders), unless you pass a second argument to useEffect(): An array of dependencies of the effect.

With such a dependency array provided, useEffect() will only re-run the function you passed as a first argument, whenever one of the dependencies changed.



useCallback()

useCallback() often is used in conjunction with useEffect() because it allows you to prevent the re-creation of a function. For this, it's important to understand that functions are just objects in JavaScript.

Therefore, if you have a function (A) inside of a function (B), the inner function (=A) will be recreated (i.e. a brand-new object is created) whenever the outer function (B) runs.

That means that in a functional component, any function you define inside of it is re-created whenever the component rebuilds.

Example:

const MyComponent = props => {
    const innerFunction = () => {
        // a function in a function!
        // this function object (stored in the 'innerFunction' constant) is constantly re-built
        // to be precise: It's re-built when MyComponent is re-built
        // MyComponent is re-built whenever its 'props' or 'state' changes
    };
};
Normally, it's no problem, that innerFunction is re-created for every render cycle.

But it becomes a problem if innerFunction is a dependency of useEffect():

const MyComponent = props => {
    const innerFunction = () => {
        // do something!
    };

    useEffect(() => {
        innerFunction();
        // The effect calls innerFunction, hence it should declare it as a dependency
        // Otherwise, if something about innerFunction changes (e.g. the data it uses), the effect would run the outdated version of innerFunction
    }, [innerFunction]);
};
Why is this code problematic?

The effect re-runs whenever innerFunction changes. As stated, it is re-created whenever MyComponent re-builds.

Because functions are objects and objects are reference types (see: https://academind.com/learn/javascript/reference-vs-primitive-values/), that means that the effect will re-run for every render cycle.

That might still not be a huge problem but it definitely is, if innerFunction does something that causes MyComponent to re-build (i.e. if it either does something that changes the props or the state).

Now, you would have an infinite loop!

useCallback() helps you prevent this.

By wrapping it around a function declaration and defining the dependencies of the function, it ensures that the function is only re-created if its dependencies changed.

Hence the function is NOT re-built on every render cycle anymore => You break out of the infinite loop!
*/