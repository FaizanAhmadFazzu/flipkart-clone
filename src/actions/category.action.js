import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {
        const res = await axios.get('/category/getCategory');
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        if (res.status == 200) {

            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}

