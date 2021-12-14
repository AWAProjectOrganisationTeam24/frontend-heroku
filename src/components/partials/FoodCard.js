import React from "react";
import "./RestaurantCard.css";
import resimg from "../res.jpeg";

import { Link } from "react-router-dom";

function FoodCard({ resimg, name, price }) {
    return (
<div className="col-md-3">
    <div className="card">
        <img
            className="card-img-top"
            src={resimg}
            alt=" cap4"
        />
        <div className="card-body">
            <h5 className="card-title">{name}</h5>

            <address className="card-text">{price}</address>
            <small className="">
                <span className="badge badge-success">available</span>
                <button className="btn btn-warning">

                    + Add to cart
                </button>
            </small>
        </div>
    </div>
</div>);
}

export default FoodCard;