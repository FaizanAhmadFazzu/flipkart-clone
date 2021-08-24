import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "../../actions";
import Layout from "../../components/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import AddressForm from "./AddressForm";
import './style.css';

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div className={`checkoutHeader ${props.active && "active"}`}>
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

export const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onAddressSubmit = () => {};

  useEffect(() => {
    dispatch(getAddress());
  }, []);
  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        {/* check if user logged in or not */}
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={"1"}
            title={"Login"}
            active={auth.authenticate}
            body={
              <div className="loggedInId">
                <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
              </div>
            }
          />

          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={"false"}
            body={
              <>
                {user.address.map((adr) => (
                  <div className="flexRow addressContainer">
                    <div>
                      <input name="address" type="radio" />
                    </div>
                    <div className="flexRow sb addressInfo">
                      <div>
                        <div>
                          <span>{adr.name}</span>
                          <span>{adr.addressType}</span>
                          <span>{adr.mobileNumber}</span>
                        </div>
                        <div>{adr.address}</div>
                        <MaterialButton
                          title={"DELIVERY HERE"}
                          style={{
                            width: "250px",
                          }}
                        />
                      </div>
                      <div>edit</div>
                    </div>
                  </div>
                ))}
              </>
            }
          />

          {/* Address Form */}
          <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={false}
          />
          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={false}
          />
        </div>
      </div>
    </Layout>
  );
};
export default CheckoutPage;
