import React from "react";
import "./RestaurantCard.css";

import { Link } from "react-router-dom";

function ProductCard({ id_restaurant, restaurantsName, location, address, status, image }) {
 const id = localStorage.id_customer;
  return (
    <div>
      <div className="card mt-4">
        <img className="card-img-top" src={`https://limitless-escarpment-21335.herokuapp.com/images/restaurants/${image}`} alt="cap1" />
        <div className="card-body">
          <h5 className="card-title">{restaurantsName}</h5>
          <i className="fas fa-solid fa-map-marker-alt"></i>
          <small> {location}</small>
          <address className="card-text">{address}</address>
          <small className="">
          
            <span className="badge badge-success">{status}</span>
          </small>
          <button className="btn btn-outline-success" ><Link to={`/restaurant/menu/${id_restaurant}/${id}`}>View Restaurant</Link></button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
