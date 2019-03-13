import { 
    CATEGORY_FILTER,
    SET_CATEGORY_FILTER
} from '../actions/constants';

const INITIAL_STATE = {
    categoryFilter: 'All users',
    updateFilter: false
}
 
export const getCategory = (state=INITIAL_STATE, action = {}) => {
     switch(action.type){
        case CATEGORY_FILTER:
            return {...state, categoryFilter: action.payload, updateFilter: true}
        case SET_CATEGORY_FILTER:
            return {...state, updateFilter: action.payload}
        default:
            return state;
     }
}