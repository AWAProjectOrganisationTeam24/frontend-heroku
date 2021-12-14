import styles from './Profile.module.css'
import { Link } from "react-router-dom";
import axios from "axios";
import {useParams} from "react-router";
import React, {useEffect, useContext} from "react";
import Header from "../partials/Header";
import {UserAuthContext} from "../Contexts";


function App() {
  const params = useParams();
  const [state, setState] = React.useState([]);

    const UserAuthContextValue = useContext(UserAuthContext);

  useEffect(() => {
      axios.get(`http://localhost:5000/view-restaurant/${params.id_manager}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + UserAuthContextValue.jwt
          }
      })
          .then(res => {
          const data = res.data;
          setState(data);
          })
          .catch(err => console.log('error'));
      }, [params.id_manager]);



  return (
    <div className={styles.Profiletext}>
        <Header id={params.id} />
            {state.map((item) => (
                        <div key = {item.id_restaurant}>
                            <img src={`http://localhost:5000/images/products/${item.image}`} className={styles.img}  alt="cart-img" /><br/>
                            Restaraunt Name: <h4>{item.name}</h4>
                            <br/>
                            <div>Address: {item.address}</div><br/>
                            <div> City: {item.city}</div><br/>
                            <Link to={`/productMaker/${params.id_manager}/${item.id_restaurant}`}>New Menu Product</Link><br/>
                            <Link to={`/restaurant-orders/${params.id_manager}/${item.id_restaurant}`}>Show orders</Link> <hr/><br/>
                            <Link to={`/profile/${params.id_manager}`}>Back to personal profile</Link> <hr/><br/>
                        </div>
            ))}



    </div>
  );
}

export default App;

/*
 <h3>Your Orders</h3>
        <div className={styles.Profileorder}>

        <div> id_order:{state.id_order}</div>
        <div> id_customer: {state.id_customer}</div>
        <div> id_restaurant: {state.id_restaurant}</div>
        <div> price: {state.price}</div>
        <div> time: {state.time}</div>
        <div> date: {state.date}</div>
        <div>
        <div> status: <div  id={"status"}>{state.status} </div></div>
    <input type="text" name="status" value={state.status} onChange={changeHandler} />
        </div>
        <div> content: {state.content}</div>
        <div> paid: {state.paid}</div>

        <button type="submit" onClick={submitHandler}>Submit</button>
          </div>




  function changeHandler(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }
  function submitHandler(e) {
    e.preventDefault();

    axios.post(`http://localhost:5000/orders/edit-order-restaurant/${state.id_restaurant}`, {
      id_order: state.id_order,
      id_customer: state.id_customer,
      id_restaurant: state.id_restaurant,
      price: state.price,
      time: state.time,
      date: state.date,
      status: state.status,
      content: state.content,
      paid: state.paid
    })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
  }
 */