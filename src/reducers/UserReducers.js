import { 
    USER_FETCH_SUCCESS,
    USER_FETCH_LOADING,
    USER_FETCH_FAILED,
    USER_ADDED_SUCCESS,
    USER_ADDED_FAILED,
    USER_ADDED_PENDING,
    USER_CLICKED
} from '../actions/constants';

const INITIAL_STATE = {
    users: null,
    loading: false,
    error: ''
}
 
export const usersReducer = (state=INITIAL_STATE, action = {}) => {
     switch(action.type){
        case USER_FETCH_SUCCESS:
            return {...state, users: action.payload, loading: false, error:''};
        case USER_FETCH_LOADING:
            return {...state, loading: true}
        case USER_FETCH_FAILED:
            return {...state, loading: false, error: 'Error with fetching data'}
        default:
            return state;
     }
}
const INITIAL_ADDUSER_STATE = {
    loading: false,
    error: ''
}

export const  addUserReducer = (state=INITIAL_ADDUSER_STATE, action = {}) => {
    switch(action.type){
        case USER_ADDED_SUCCESS:
            return {...state, loading: false, error: ''}
        case USER_ADDED_FAILED:
            return {...state, loading: false, error: 'Error with adding user'}
        case USER_ADDED_PENDING:
        return {...state, loading: true}
        default:
           return state;
    }
}