import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <Layout>
      {user.orders.map((order) => {
        return order.items.map((item) => (
          <Card style={{ maxWidth: "1200px", margin: "5px auto" }}>
            <div className="orderItemContainer">
              <div
                style={{
                  width: 80,
                  height: 80,
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                <img
                  style={{
                    maxWidth: 80,
                    maxHeight: 80,
                  }}
                  src={generatePublicUrl(item.productId.productPictures[0].img)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: 300,
                  }}
                >
                  {item.productId.name}
                </div>
                <div>{item.payablePrice}</div>
                <div>{order.paymentStatus}</div>
              </div>
            </div>
          </Card>
        ));
      })}
    </Layout>
  );
};

export default OrderPage;
