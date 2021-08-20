import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { useSelector, useDispatch } from "react-redux";
import CartItem from './CartItem';

import "./style.css";
import { addToCart, getCartItems } from "../../actions";

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector(state => state.auth);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems])
  console.log(cartItems);

  useEffect(() => {   
    if(auth.authenticate){
        getCartItems();
    }
  }, [auth.authenticate])  

  const onQuantityIncreament = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1))
  }

  const onQuantityDecreament = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1))
  }

  return (
    <Layout>
      <div className="cartContainer" style={{  alignItems: 'flex-start' }}>
        <Card headerLeft={"My Cart"} headerRight={<div>Deliver To</div>}>
          {Object.keys(cartItems).map((key, index) => (
            <CartItem 
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncreament}
            onQuantityDec={onQuantityDecreament}
            />
          ))}
        </Card>
        <Card
          headerLeft={'Price'}
          style={{
            width: "500px",
          }}
        >
        </Card>
      </div>
    </Layout>
  );
};

export default CartPage;
