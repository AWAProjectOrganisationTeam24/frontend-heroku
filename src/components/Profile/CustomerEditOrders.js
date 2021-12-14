import styles from './Profile.module.css'
import {useParams} from "react-router";
import axios from "axios";
import React, {useContext, useEffect} from "react";
import Constants from "../Constants.json";
import {UserAuthContext} from "../Contexts";
import Header from "../partials/Header";
import {Link} from "react-router-dom";


function App() {

    const [state, setState] = React.useState([]);
    const params = useParams();
    const UserAuthContextValue = useContext(UserAuthContext);

    useEffect(() => {
        axios.get(Constants.API_ADDRESS + `/orders/edit-order/customer/${params.id_order}`, {
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
    }, [params.id]);

    function change(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }
    function submitHandler(e) {
        console.log(state.status);
        axios.post(Constants.API_ADDRESS + `/edit-order/customer/${params.id_order}`, {
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
            <Header/>
            <h3>Your Orders</h3>

                <>

                        <div key={state.id_restaurant}>
                            <div className={styles.Profileorder}>
                                <div> id_customer: {params.id}</div>
                                <div> id_restaurant: {state.id_restaurant}</div>
                                <div> price: {state.price}</div>
                                <div> time: {state.time}</div>
                                <div> date: {state.date}</div>
                                <div> content: {state.content}</div>
                                <div> paid: {state.paid}</div>

                                <form onSubmit={submitHandler}>
                                    <div> status: {state.status}</div>
                                    <div><input type="radio" name="status" value="Delivered" onChange={change}/>Delivered</div>
                                    <button type="submit" >Confirm delivery</button> <hr/><br/>

                                </form>
                            </div>
                        </div>
                    <Link to={`/profile/orders/${params.id}`}>Back to orders</Link> <hr/><br/>

                </>
        </div>
    );
}

export default App;
