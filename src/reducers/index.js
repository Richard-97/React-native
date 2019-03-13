import { combineReducers } from 'redux';
import { usersReducer, addUserReducer } from './UserReducers';
import { getCategory } from './CategoriesReducers';

export default combineReducers({
    usersReducer,
    addUserReducer,
    getCategory
})