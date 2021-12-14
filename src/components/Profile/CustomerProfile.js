import styles from './Profile.module.css'
import { Link } from "react-router-dom";
import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import { UserAuthContext } from '../Contexts'
import Constants from '../Constants.json'
import Header from "../partials/Header";


export default function App() {
    const UserAuthContextValue = useContext(UserAuthContext);


    const id_customer = localStorage.id_customer;
    const [state, setState] = React.useState('');

    useEffect(() => {
     axios.get(Constants.API_ADDRESS + `/customer/view-customer/${id_customer}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + UserAuthContextValue.jwt
          }
      })
         .then(res => {
         const data = res.data;
         setState(data[0]);
     })
         .catch(err => console.log('error'));
    }, [id_customer]);


  return (
    <div className={styles.Profiletext}>

        <Header />
        
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6">
            <div className="card text-white bg-dark">
            <h3>Profile Info</h3>
            <div>
            
        Name:
          
            {state.firstname}
           
            {state.lastname}

          </div>
          <div>Mail: {state.mail}</div>
          <div>Money: {state.money}</div>
          <div>Address: {state.address}</div>
          <div>City: {state.city}</div>
     

      <Link to={`/restaurantMaker/${id_customer.id}/${state.id_manager}`}><h3>New Restaurant <i class="far fa-plus-square"></i></h3></Link>
        <div>
        <Link to={`/profile/restaurant/${id_customer.id}/${state.id_manager}`}><h3> <i class="fas fa-utensils"></i> Your Restaurants</h3></Link>
          </div>

      <h3>
      <Link to={`/profile/orders/${state.id_customer}`}>Your Orders <i class="fas fa-sort-amount-up-alt"></i></Link>
      </h3>
      </div>



            </div>
          </div>
        </div>
     
    </div>
  );
}

