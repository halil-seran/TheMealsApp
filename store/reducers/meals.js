//npm install --save redux react-redux

import { MEALS } from '../../data/dummy-data';

const initialState = { //başlangıç state i
    meals: MEALS,
    filteredMeals:MEALS,
    favoriteMeals:[]
};

const mealsReducer = (state = initialState, action) => {
    return state;
}

export default mealsReducer;