import React,  { useState } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";
const CartItem = (props) => {
    const [qty, setQty] = useState(props.cartItem.qty);
    const {
        _id,
        name,
        img,
        price,
    } = props.cartItem;

    const onQuantityIncreament = () => {
        setQty(qty + 1);
        props.onQuantityInc(_id, qty +1)
    }

    const onQuantityDecreament = () => {
        if (qty <= 1) return;
        setQty(qty - 1);
        props.onQuantityDec(_id, qty - 1)
    }
  return (
    <div className="cartItemContainer">
        <div className="flexRow">
            <div className="cartProImgContainer">
                <img src={generatePublicUrl(img)} alt={''} />
            </div>
            <div className="cartItemDetails">
                <div>
                    <p>{name}</p>
                    <p>Rs. {price}</p>
                </div>
                <div>Delivery in 3 - 5 days</div>
            </div>
        </div>

        <div style={{
            display: 'flex',
            margin: '5px 0'
        }}>
            {/* quantity Control */}
            <div className="quantityControl">
                <button onClick={onQuantityDecreament}>-</button>
                <input value={qty} readOnly />
                <button onClick={onQuantityIncreament}>+</button>
            </div>
            <button className="cartActionBtn">save for letter</button>
            <button className="cartActionBtn">Remove</button>
        </div>
    </div>
  );
};

export default CartItem;
