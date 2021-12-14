import styles from './Profile.module.css'
import {useParams} from "react-router";
import {Link} from 'react-router-dom';
import axios from "axios";
import React, {useContext, useEffect} from "react";
import Constants from "../Constants.json";
import {UserAuthContext} from "../Contexts";
import Header from "../partials/Header";


function App() {

    //to this const customer id you want to search
    const [state, setState] = React.useState([]);
    const params = useParams();
    const UserAuthContextValue = useContext(UserAuthContext);

    useEffect(() => {
        axios.get(Constants.API_ADDRESS + `/orders/edit-order/restaurant/${params.id_order}`, {
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
    }, [params.id_order]);

    const status = state.status;

    function changeHandler(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }
    function submitHandler(e) {
        console.log(state.status);
        axios.post(Constants.API_ADDRESS + `/orders/edit-order/restaurant/${params.id_order}`, {
            status: state.status
        })
            .then(res => {
                   console.log(res.data)
                    const data = res.data;
                    setState(data);
            })
            .catch(err => console.log('error'));
    }
    return (

    <div className={styles.Profiletext}>
        <Header />
      <h3>Restaurant Order</h3>
        <div className={styles.Profileorder}>
                <>
                    <div key = {state.id_restaurant}>
                    <div> id_customer: {state.id_customer}</div>
                    <div> price: {state.price}</div>
                    <div> time: {state.time}</div>
                    <div> date: {state.date}</div>
                        <br/>
                        <form onSubmit={submitHandler}>
                            <div> status: {status}</div>
                            <div><input type="radio" name="status" value="Received" onChange={changeHandler}/>Received</div>
                            <div><input type="radio" name="status" value="Preparing" onChange={changeHandler}/>Preparing</div>
                            <div><input type="radio" name="status" value="Ready for delivery" onChange={changeHandler}/>Ready for delivery</div>
                            <div><input type="radio" name="status" value="Delivering" onChange={changeHandler}/>Delivering</div>
                            <br/>


                            <div> content: {state.content}</div>
                            <div> paid: {state.paid}</div>
                            <button type="submit" >Edit order</button> <hr/><br/>
                        </form>
                    </div>
                    <Link to={`/restaurant-orders/${state.id_restaurant}`}>Back to orders</Link> <hr/><br/>
                </>
        </div>
    </div>
  );
}

export default App;
