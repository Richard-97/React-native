import firebase from '@firebase/app';
import '@firebase/database'
import { Actions } from 'react-native-router-flux';

import {
    USER_FETCH_SUCCESS,
    USER_FETCH_LOADING,
    USER_ADDED_SUCCESS,
    USER_ADDED_PENDING,
    USER_ADDED_FAILED,
} from './constants'

export const userCreate = ({ name, description, categories, image_url }) => {
    return dispatch => {
        dispatch({ type: USER_ADDED_PENDING })
        firebase.database().ref(`/users`).push({ name, description, categories, image_url })
        .then(() => {
            dispatch({ type: USER_ADDED_SUCCESS })
        })
        .catch(() => {
            dispatch({ type: USER_ADDED_FAILED })
        })
    }
}
export const usersFetch = (category, num=8) => {
    console.log(category)
    return dispatch => {
        dispatch({ type: USER_FETCH_LOADING})
        firebase.database().ref(`/users`).limitToFirst(num)
            .on('value', snapshot => {
                let filteredData = []
                snapshot.forEach(nextChild=>{
                    if(nextChild.val().categories == category || category === 'All users'){
                        const newUser = nextChild.val()
                        newUser['ID'] = nextChild.key
                        filteredData.push(newUser)
                    }
                })
                console.log(filteredData)
                dispatch({ type: USER_FETCH_SUCCESS, payload: filteredData})
            })
    }
}

export const userUpdate = ({ name, description, categories, image_url,id }) => {
    return () => {
        console.log(name, description, categories, image_url )
        firebase.database().ref(`/users/${id}`)
            .set({ name, description, categories, image_url })
            .then(()=>{
                Actions.allusers()
            })
    }
}

export const userDelete = ({ id }) => {
    return () => {
        firebase.database().ref(`/users/${id}`)
            .remove()
            .then(() => {
                Actions.allusers()
            })
    }
}