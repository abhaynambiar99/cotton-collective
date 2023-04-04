import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { createOrder } from "./helper/orderHelper";

import DropIn from "braintree-web-drop-in-react";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { cartEmpty } from "./helper/cartHelper";

//const { user, token } = isAuthenticated();

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      if (info.error) {
        console.log("error", info.error);

        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropin = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{
                authorization: info.clientToken,
              }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-block btn-sm btn-success mb-3"
              onClick={onPurchase}
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Please Add products/ log in first</h3>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getnonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const PaymentData = {
        PaymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, PaymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success });
          console.log("payment successful");

          /*const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          };

          createOrder(userId, token, orderData).then(
            console.log("created order")
          ) */
            

          cartEmpty(() => {
            console.log("empty cart");
          });
          setReload(!reload);

        })

        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("payment failed");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  return (
    <div>
      {showbtdropin()}
      <h3> Total bill: {getAmount()} </h3>
    </div>
  );
};

export default Payment;
