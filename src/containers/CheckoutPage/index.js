import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAddress } from "../../actions";
import Layout from "../../components/Layout";
import { MaterialButton, MaterialInput } from "../../components/MaterialUI";
import AddressForm from "./AddressForm";
import "./style.css";

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
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
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const onAddressSubmit = () => {};

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  const selectAddress = (addr) => {
    // console.log(addr)
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
  };

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        {/* check if user logged in or not */}
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={"1"}
            title={"Login"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <MaterialInput label="Email" />
              )
            }
          />

          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress}
            body={
              <>
                {confirmAddress
                  ? JSON.stringify(selectedAddress)
                  : address.map((adr) => (
                      <div className="flexRow addressContainer">
                        <div>
                          <input
                            name="address"
                            onClick={() => selectAddress(adr)}
                            type="radio"
                          />
                        </div>
                        <div className="flexRow sb addressInfo">
                          <div>
                            <div>
                              <span>{adr.name}</span>
                              <span>{adr.addressType}</span>
                              <span>{adr.mobileNumber}</span>
                            </div>
                            <div>{adr.address}</div>
                            {adr.selected && (
                              <MaterialButton
                                title={"DELIVERY HERE"}
                                onClick={() => confirmDeliveryAddress(adr)}
                                style={{
                                  width: "250px",
                                }}
                              />
                            )}
                          </div>
                          {adr.selected && <div>edit</div>}
                        </div>
                      </div>
                    ))}
              </>
            }
          />

          {/* Address Form */}

          { confirmAddress ? null : (newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ))}

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
