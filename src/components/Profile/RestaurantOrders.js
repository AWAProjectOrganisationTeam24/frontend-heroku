import styles from './Profile.module.css'
import {useParams} from "react-router";
import {Link, useNavigate} from 'react-router-dom';
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
        axios.get(Constants.API_ADDRESS + `/orders/restaurant/${params.id_restaurant}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserAuthContextValue.jwt
            }
        })
            .then(res => {
                if(res.data === undefined){
                    console.log('no orders')
                   // navigate(`/profile/${id_restaurant.id}`, { replace: true });
                }else {
                    const data = res.data;
                    setState(data);
                }
            })
            .catch(err => console.log('error'));
    }, [params.id_restaurant, UserAuthContextValue]);


    return (

    <div className={styles.Profiletext}>
        <Header />
      <h3>Restaurant Orders</h3>
        <div className={styles.Profileorder}>
            {state.length === 0 && <div className={styles.header}>Restaurant does not have any orders</div>}
            {state.length !== 0 && (
                <>
                    {state.map((item) => (
                    <div key = {item.id_restaurant}>
                    <div> id_customer: {item.id_customer}</div>
                    <div> price: {item.price}</div>
                    <div> time: {item.time}</div>
                    <div> date: {item.date}</div>
                    <div> status: {item.status}</div>
                    <div> content: {item.content}</div>
                    <div> paid: {item.paid}</div>
                        <Link to={`/restaurant-orders/${item.id_restaurant}/${item.id_order}`}>Edit order</Link> <hr/><br/>
                        <Link to={`/profile/restaurant/${params.id_manager}/${params.id_manager}`}>Back to restaurant profile</Link> <hr/><br/>

                    </div>
                    ))}
                </>
            )}

        </div>
    </div>
  );
}

export default App;
