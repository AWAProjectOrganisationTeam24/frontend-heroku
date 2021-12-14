import React from 'react'
import "./partials/RestaurantCard.css"


function ProductCard(props) {
  const { product, onAdd, image} = props;

  return (
    <div>
      <div className="card">
        <img className="card-img-top" src={`http://localhost:5000/images/products/${image}`} alt=" cap4" />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>

          <address className="card-text">$ {product.price} euro</address>
          <small className="">
            <span className="badge badge-success">available</span>
            <button onClick={() => onAdd(product)} className=" text-white btn btn-warning">
               Add to cart <i class="fas fa-cart-plus"></i>
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
