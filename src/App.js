import React, {useState} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RestaurantProfile from "./components/Profile/RestaurantProfile";
import CustomerProfile from "./components/Profile/CustomerProfile";
import ProfileOrders from "./components/Profile/CustomerOrders";
import ProfileEditOrders from "./components/Profile/CustomerEditOrders";
import Menu from "./components/Menu"
import Login from "./components/Login";
import Logout from "./components/Logout";
import CreateUser from "./components/CreateUser";
import RestaurantMaker from "./pageMakers/RestaurantMaker";
import ProductMaker from "./pageMakers/ProductMaker";
import RestaurantOrders from "./components/Profile/RestaurantOrders";
import Home from "./components/Home";
import RestaurantEditOrder from "./components/Profile/RestaurantEditOrder";
import { UserAuthContext } from './components/Contexts';

import ShoppingCart from "./components/Shoppingcart";
import Order from "./components/Order";

const jwtFromStorage = window.localStorage.getItem('appAuthData');


function App() {
    const initialAuthData = {
        jwt: jwtFromStorage,
        login: (newValueForJwt) => {
            const newAuthData = { ...userAuthData,
                jwt: newValueForJwt
            };
            window.localStorage.setItem('appAuthData', newValueForJwt);
            setUserAuthData(newAuthData);
        },
        logout: () => {
            window.localStorage.removeItem('appAuthData');
            setUserAuthData({...initialAuthData});
        }
    };


    const [ userAuthData, setUserAuthData ] = useState({...initialAuthData});

    //unprotected routes
    let authRoutes = <>
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/login/createUser" element={<CreateUser/> } />
    </>

    if(userAuthData.jwt) {
        //protected routes
        authRoutes = <Route path="/profile/orders/:id" element={ <ProfileOrders /> }/>
    }
    /*
    <UserAuthContext.Consumer>
                { value => (<div>Auth status: { value.jwt != null ? "Logged in": "Not logged in" }</div>) }
            </UserAuthContext.Consumer>
     */

    return (
        <UserAuthContext.Provider value={ userAuthData }>


            <BrowserRouter>
                <Routes>
                    {
                        authRoutes
                    }
                  <Route path="/profile/orders/:id" element={<ProfileOrders/>}/>
                  <Route path="/profile/customer-order/:id/:id_order" element={<ProfileEditOrders/>}/>
                  <Route path="/profile/restaurant/:id/:id_manager" element={<RestaurantProfile/>}/>
                  <Route exact path="/restaurant-orders/:id_manager/:id_restaurant" element={<RestaurantOrders/>}/>
                  <Route exact path="/restaurant-orders/:id_restaurant/:id_order" element={<RestaurantEditOrder/>}/>
                  <Route exact path="/" element={<Home/>}/>

                  <Route exact path="/makeOrder/:id_restaurant/:id" element={<Order/>} />
                  <Route path="/profile" element={<CustomerProfile/> } />

                  <Route path="/restaurant/menu/:id_restaurant/:id" element={<Menu />}/>
                  <Route path="/restaurantMaker/:id_customer/:id" element={<RestaurantMaker/> } />
                  <Route path="/productMaker/:id_manager/:id_restaurant" element={<ProductMaker/> } />
                  <Route path="/cart" element={<ShoppingCart/>} />
                </Routes>
            </BrowserRouter>
        </UserAuthContext.Provider>
    );

}

export default App;
