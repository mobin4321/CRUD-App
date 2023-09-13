import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  function hello() {
    console.log("====================================");
    console.log("called");
    console.log("====================================");
  }
  return (
    <div className="col-sm-6 col-md-3 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {props.email}
          </h6>
          <p className="card-text">Age: {props.age}</p>
          <a href="#" onClick={props.handleDelete} className="card-link ">
            Delete
          </a>
          <Link to={`/${props.id}`} className="card-link ">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
