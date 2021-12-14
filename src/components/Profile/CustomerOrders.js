import styles from './Profile.module.css'
import {useParams} from "react-router";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import React, {useContext, useEffect} from "react";
import Constants from "../Constants.json";
import {UserAuthContext} from "../Contexts";
import Header from "../partials/Header";


function App() {

    let navigate = useNavigate();

    //to this const customer id you want to search
    const [state, setState] = React.useState([]);
    const id_customer = useParams();

    const UserAuthContextValue = useContext(UserAuthContext);

    useEffect(() => {
        axios.get(Constants.API_ADDRESS + `/orders/customer/${id_customer.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserAuthContextValue.jwt
            }
        })
            .then(res => {
                if (res.data === undefined) {
                    navigate(`/profile/${id_customer.id}`, {replace: true});
                } else {
                    const data = res.data;
                    setState(data);
                }
            })
            .catch(err => console.log('error'));
    }, [id_customer.id]);


    return (

        <div className={styles.Profiletext}>
            <Header/>
            <Link to={`/profile`}>Back to profile</Link> <hr/><br/>

            <h3>Your Orders</h3>
            {state.length === 0 && <div className={styles.header}>You dont have any orders</div>}
            {state.length !== 0 && (
                <>
                    {state.map((item) => (
                        <div key={item.id_restaurant}>
                            <div className={styles.Profileorder}>
                                <div> id_customer: {id_customer.id}</div>
                                <div> id_restaurant: {item.id_restaurant}</div>
                                <div> price: {item.price}</div>
                                <div> time: {item.time}</div>
                                <div> date: {item.date}</div>
                                <div> status: {item.status}</div>
                                <div> content: {item.content}</div>
                                <div> paid: {item.paid}</div>
                            </div>
                            <Link to={`/profile/customer-order/${id_customer.id}/${item.id_order}`}>Confirm delivery</Link> <hr/><br/>
                        </div>
                        ))}
                </>
            )}
        </div>
    );
}

export default App;
