//npm install --save redux react-redux

import { MEALS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

const initialState = { //başlangıç state i
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1)
                return { ...state, favoriteMeals: updatedFavMeals };
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.lactoseFree && !meal.lactoseFree) {
                    return false;
                }
                if (appliedFilters.vegetarian && !meal.vegetarian) {
                    return false;
                }
                if (appliedFilters.vegan && !meal.vegan) {
                    return false;
                }
                return true;
            });
            return { ...state, filteredMeals: updatedFilteredMeals };
        default:
            return state;
    }
    return state;
}

export default mealsReducer;