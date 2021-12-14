import React, { useEffect, useState } from "react";
import Header from "./partials/Header";
import "../App.css";
import ProductCard from "./partials/RestaurantCard";
import Search from "./Search";
import FoodNotFound from "./FoodNotFound";
import axios from "axios";
import {useParams} from "react-router";
//import {UserAuthContext} from "./Contexts";

function Home(props) {
    //const UserAuthContextValue = useContext(UserAuthContext);
    const params = useParams();
    if(params.id === undefined){
        params.id = 'non'
    }
    const [items, setItems] = useState('');
  const [search, setSearch] = React.useState("");


    useEffect(() => {
        getRestaurants();
    }, []);

    // call the data from api
    const getRestaurants = () => {
        axios.get(`http://localhost:5000/`)
            .then(res => {
                const data = res.data;
                setItems(data);
            })
            .catch(err => console.log('error'));
    }

  const filterList = () => {
    if (search === "") {
      return items;
    }else {
        return items.filter(
            (item) => item.city.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
    }
  };

  return (
    <div className="main">
      <Header />
      <Search
        searchParam={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search restaurant by city.."
      />

      <div className="rowbox ">
        {filterList().length > 0 ? (
          <>
            {filterList().map((item) => (
              <div className="column ">
                <ProductCard
                  restaurantsName={item.name}
                  location={item.city}
                  address={item.address}
                  status={item.openHr}
                  id_restaurant={item.id_restaurant}
                  id={params.id}
                  image = {item.image}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="column">
            <FoodNotFound />
          </div>
        )}
      </div>

    </div>
  );
}

export default Home;
