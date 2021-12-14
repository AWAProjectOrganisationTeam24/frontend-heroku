import React, { useState, useEffect } from 'react'
import Header from './partials/Header'
import "../App.css"
import ProductCard from './MenuFood'
import Search from './Search'
import FoodNotFound from './FoodNotFound'
import Footer from './partials/Footer'
import Basket from './Shoppingcart';
import axios from "axios";
import {useParams} from "react-router";
import {UserAuthContext} from "./Contexts";
import Constants from "./Constants.json";


function Home() {
  const [search, setSearch] = React.useState("");
  const [products, setProducts ] = useState('');

  const [cartItems, setCartItems] = useState([]);
  const params = useParams();



  useEffect(() => {
    axios.get(Constants.API_ADDRESS + `/products/restaurant/${params.id_restaurant}`)
        .then(res => {
          const data = res.data;
          setProducts(data);
        })
        .catch(err => console.log('error'));
  }, [params.id_restaurant]);



  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const filterList = () => {
    if (search === "") {
      return products;
    } else{
      return products.filter(
          (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    }
  };

  return (
    <div className="main">
      <div>
        <Header countCartItems={cartItems.length}></Header>
        <div></div>
      </div>

      <Search
        searchParam={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Your Meal here.."
      />

        <div>
          <Basket cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  id={params.id}
                  id_restaurant={params.id_restaurant}/>
        </div>
        <div className="row">
     
        {filterList().length > 0 ? (
          <>
            {filterList().map((products) => (
              <div className="column">
                <ProductCard product={products}
                             onAdd={onAdd}
                             image = {products.image}
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
      <Footer />
    </div>
  );
}

export default Home;
