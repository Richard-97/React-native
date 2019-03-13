import {
    CATEGORY_FILTER,
    SET_CATEGORY_FILTER
} from './constants'

export const setCategoryFilter = (category) => ({
    type: CATEGORY_FILTER,
    payload: category
})

export const setUpdateCategory = (bool) => ({
    type: SET_CATEGORY_FILTER,
    payload: bool
})