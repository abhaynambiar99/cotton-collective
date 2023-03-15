import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminRightSide = () => {
    return (
      <div className="mb-4 ">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success">Name: </span> {name}
          </li>

          <li className="list-group-item">
            <span className="badge bg-success">Email </span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge bg-danger">Admin Area </span>
          </li>
        </ul>
      </div>
    );
  };

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white"> Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="Nav-link text-success">
              Create categories
            </Link>
          </li>

          <li className="list-group-item">
            <Link to="/admin/categories" className="Nav-link text-success">
              Manage categories
            </Link>
          </li>

          <li className="list-group-item">
            <Link to="/admin/create/product" className="Nav-link text-success">
              Create product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="Nav-link text-success">
              Manage products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="Nav-link text-success">
              Manage orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to admin dashboard"
      description="Manage all your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>

        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
