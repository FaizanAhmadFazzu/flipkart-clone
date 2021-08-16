import React, { useEffect } from 'react'
import Layout from '../../components/Layout';

import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from '../../actions';


const ProductDetailsPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    useEffect(() => {
        const { productId } = props.match.params;
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload))
    }, [])
    return (
        <Layout>
            {product.productDetails.name}
        </Layout>
    )
}

export default ProductDetailsPage
