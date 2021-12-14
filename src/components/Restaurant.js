import React from "react";
import Header from "./partials/Header";
import Foodcard from "./partials/FoodCard";

import resimg from "./res.jpeg";
import ProductCard from "./partials/RestaurantCard";
import {data} from "./Data/Data";
import FoodNotFound from "./FoodNotFound";

function Restaurant() {
  const imgheight = {
    height: "300px",
  };

    const [items] = React.useState(data);
    const [search, setSearch] = React.useState("");

    const filterList = () => {
        if (search === "") {
            return items;
        }
        return items.filter(
            (item) => item.location.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
    };

        return (
    <div>
      {/* header */}
      <Header />

        <div className="rowbox ">
            {filterList().length > 0 ? (
                <>
                    {filterList().map((item) => (
                        <div className="column ">
                            <Foodcard
                                name={item.name}
                                price={item.price}
                            />
                        </div>
                    ))}
                </>
            ) : (
                <div className="column">
                    <FoodNotFound/>
                </div>
            )}
        </div>

        <div className="container mt-4">
        <div className="row ">
          <div className="col-md-12">
            <div class="card">
              <img
                class="card-img-top"
                style={imgheight}
                src={resimg}
                alt="img2"
              />
              <div class="card-body">
                <h5 class="card-title">restaurantsName</h5>
                <i className="fas fa-solid fa-map-marker-alt"></i>
                <small> Location</small>
                <address class="card-text">address</address>
                <small className="">
                  <span class="badge badge-success">Open</span>
                </small>

                <h1 className="text-center">Menu</h1>
              </div>

            </div>
          </div>
        </div>
    </div>
    </div>

  );
}

export default Restaurant;
