import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, useParams } from "react-router-dom";
import { createCategory, getACategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = () => {
  const { categoryId } = useParams();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getACategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(categoryId);
  }, [categoryId]);

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    // Call the updateCategory API here
    updateCategory(categoryId, user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setError(false);
        setSuccess(true);
        setName(data.name); // set the new name returned by API
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to update category</h4>;
    }
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Update the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For example: Summer"
          />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update Category"
      description="Update category names here"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
