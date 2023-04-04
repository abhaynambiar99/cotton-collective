import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import "../styles.css";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Payment from "./Payment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addToCart={false}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h4>This section is for checkout</h4>
        
      </div>
    );
  };

  console.log("API IS: ", API);
  return (
    <Base title="Cart Page" description="Ready to check out">
      <div className="row text-center">
        <div className="col-6">
          {" "}
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>NO PRODUCTS IN CART </h3>
          )}{" "}
        </div>

        <div className="col-6">{ <Payment products={products} setReload={setReload} /> }</div>
      </div>
    </Base>
  );
};

export default Cart;
