import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Base from "../core/Base";


import {
  createProduct,
  getCategories,
  getAProduct,
  updateProduct,
} from "./helper/adminapicall";

import { isAuthenticated } from "../auth/helper";

const UpdateProduct = () => {
  const { productId, userId } = useParams(); // get id from URL
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    updatedProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    updatedProduct,
    getaRedirect,
    formData,
  } = values;

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  const preload = (productId) => {
    getAProduct(productId).then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        console.log(data)
        
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {

    preload(productId);
  }, [productId, userId]);

  //TODO: work on it

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    //console.log(userId,"    " ,user._id);

    console.log("THis is ",formData);

    updateProduct(productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        console.log("setval comp");
      } else {
        console.log("going into else");
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          updatedProduct: data.name,
        });
      }
    }).catch((err) => console.log(err));
  };

  const handleChange = (name) => (event) => {
    console.log("Line 1 handle change");

    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: updatedProduct ? "" : "none" }}
    >
      {" "}
      {console.log("success message")}
      {updatedProduct && <h4>{updatedProduct} updated successfully</h4>}
    </div>
  );

  const updateProductForm = () => (
    <form className="mt-3 mb-3">
      <span className="text-white mt-3 mb-3">Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success mt-3 mb-3">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control mt-3 mb-3"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control mt-3 mb-3"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control mt-3 mb-3"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control mt-3 mb-3"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control mt-3 mb-3"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mt-3 mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update product page"
      description="Update the product here"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-dark mb-3">
        {" "}
        Admin Home
      </Link>

      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {" "}
          {successMessage()}
          {updateProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
