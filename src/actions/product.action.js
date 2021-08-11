import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/product/${slug}`);
    if (res.status == 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG,
        payload: res.data,
      });
    } else {
      // dispatch({
      //     type:
      // })
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params;
      const res = await axios.get(`/page/${cid}/${type}`);
      dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
      if (res.status == 200) {
          console.log(res.data)
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
        console.log(error)
    }
  };
};