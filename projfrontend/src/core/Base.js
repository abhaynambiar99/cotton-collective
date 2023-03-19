import React from "react";
import Menu from "./Menu";
import "../../src/styles.css"

const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => { return(
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4"> {title} </h2>
          <p className="lead"> {description} </p>
        </div>
        <div className={className}> {children} </div>
      </div>
      <footer className="bg-dark text-white py-3">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h4 className="text-success">If you have any questions, feel free to reach out</h4>
        <button className="btn btn-warning">Contact us</button>
      </div>
      <div className="col-md-6">
        <p className="text-muted mb-0 text-end">Created by <span className="fw-bold">Abhay Nambiar</span> at <span className="fw-bold">The Cotton Collective</span></p>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}


export default Base;
