import React from "react";
import Menu from "./Menu";
import "../../src/styles.css";

const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4"> {title} </h2>
          <p className="lead"> {description} </p>
        </div>
        <div className={className}> {children} </div>
      </div>
      <footer className="items-center text-white py-3 mr-5">
        <div className="row">
          <div className="col-md-6 contact-section">
            <h4 className="text-success">
              If you have any questions, feel free to reach out
            </h4>
            <button className="btn btn-warning contact-btn">Contact Us</button>

            <div className="container">
              <br />
              <span className="fw-bold text-muted">
                The Cotton Collective by Abhay Nambiar
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
