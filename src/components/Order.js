import React, { useContext, useState, useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router";
import {Link} from 'react-router-dom'
import axios from "axios";
import Constants from "./Constants.json";
import Header from "./partials/Header";
import { UserAuthContext } from './Contexts'

function Order(props) {

    const UserAuthContextValue = useContext(UserAuthContext);

    const items = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [cartItems, setCart] = useState([]);
    const [price, setPrice] = useState('');

    const [state, setState] = useState({
        mail: '',
        customerName: '',
        deliveryAddress: '',
        status: 'ordered',
        paid: 1
    })
    const [customer, setCustomer] = useState('');

    useEffect(() => {
        axios.get(Constants.API_ADDRESS + `/customer/view-customer/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserAuthContextValue.jwt
            }
        }).then(res => {
                const data = res.data[0];
                setCustomer(data);
            })
            .catch(err => console.log('error'))
    }, [params.id]);

    function changeHandler(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }


    const submitHandler = async (e) => {
            if(customer.money > price){
                //set time
                const d = new Date();
                const month = d.getMonth() + 1;
                const date = d.getDate() + '.' + month + '.'+ d.getFullYear();
                const time = d.getHours() + ':'+ d.getMinutes() + ':'+ d.getSeconds();


                const url = `https://limitless-escarpment-21335.herokuapp.com/orders/add-order/${params.id_restaurant}/${params.id}`
                axios.post( url, {
                    price: price,
                    time: time,
                    date: date,
                    status: state.status,
                    content: cartItems[0].name,
                    paid: state.paid
                })
                    .then(res => {
                        navigate(`/`, {replace: true});
                    })
                    .catch(err => console.log('error'));
            }else{
                alert('You dont have enought money!');
                console.log('You dont have enought money!');
                navigate(`/profile/${params.id}`, { replace: true });
            }
    };
    useEffect(() => {
        setCart(items.state.cartItems);
        setPrice(items.state.itemsPrice);
    });


    return(
        <>
            <Header />
          <div className="container">
              <h3>Order: </h3>
                  {cartItems.map((e) =>
                      <div key={e.id}>
                          <div>id: {params.id}</div>
                          <div>Name: {e.name}</div>
                          <div>Dish: {e.qty}x
                              {e.price}€</div>
                          <hr/>
                      </div>
                  )}
                <div>Total: {price}€ </div>
                <div>Money: {customer.money}€</div>
                <div>Enter ordering information:</div>
                <div>
                    <form>
                        <div className="form-container">
                            <div>
                                <label>Email</label>
                                  <input name="mail"
                                         type="text"
                                         value={state.mail}
                                         onChange={changeHandler}
                                         required
                                  />

                            </div>
                            <div>
                                <label>Name</label>
                                  <input
                                    name="customerName"
                                    type="text"
                                    value={state.customerName}
                                    onChange={changeHandler}
                                    required
                                  />
                            </div>
                            <div>
                                <label>Delivery location</label>
                                  <input
                                    name="deliveryAddress"
                                    type="text"
                                    value={state.deliveryAddress}
                                    onChange={changeHandler}
                                    required
                                  />
                            </div>
                            <Link to={{pathname:`/profile/orders/${params.id}`}}>
                                <button onClick={() => submitHandler()}>Pay</button>
                            </Link>

                        </div>
                    </form>
                </div>
            </div>
        </>
  );
}

export default Order;
