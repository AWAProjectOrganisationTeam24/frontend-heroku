import React from "react";
import "./FoodCard.css";
import {Link} from 'react-router-dom';

function ProductCard({ restaurantsName, location, address, status, id_restaurant, image }) {
  return (
    <div>
      <div className="card mt-4">
        <img src={`${image}`} alt="cap1"  />
        <div className="card-body">
          <h5 className="card-title">{restaurantsName}</h5>
          <i className="fas fa-solid fa-map-marker-alt"></i>
          <small> {location}</small>
          <address className="card-text">{address}</address>
          <small className="">
          
            <span className="badge badge-success">{status}</span>
          </small>
          <button className="btn btn-outline-success"><Link to={`/restaurant/menu/${id_restaurant}`}>View Restaurant</Link></button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
