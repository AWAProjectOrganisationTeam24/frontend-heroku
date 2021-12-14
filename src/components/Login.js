import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserAuthContext} from './Contexts'
import Constants from "./Constants.json";

export default function Login(props) {

    const UserAuthContextValue = useContext(UserAuthContext);
    let navigate = useNavigate();
    const [ loginProcessState, setLoginProcessState ] = useState("idle");

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoginProcessState("processing");
        try {
            const result = await axios.post(Constants.API_ADDRESS + '/customer/login', null, {
                auth: {
                    username: e.target.mail.value,
                    password: e.target.psw.value
                }
            })

            setLoginProcessState("success");
            setTimeout(() => {
                setLoginProcessState("idle")
                UserAuthContextValue.login(result.data.token);
                const token = result.data.token;
                const id_customer = result.data.id_customer;

                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('id_customer', JSON.stringify(id_customer));

                navigate(`/`, {replace: true});
            }, 1500);
        } catch (error) {
            console.error(error.message);
            setLoginProcessState("error");
            setTimeout(() => setLoginProcessState("idle"), 1500);
        }
    }
    let loginUIControls = null;
    switch(loginProcessState) {
        case "idle":
            loginUIControls = <button type="submit">Login</button>
            break;

        case "processing":
            loginUIControls = <span style={{color: 'blue'}}>Processing login...</span>
            break;

        case "success":
            loginUIControls = <span  className="alert alert-sucess" style={{color: 'green'}}>Login successful</span>
            break;

        case "error":
            loginUIControls = <span style={{color: 'red'}}>Error</span>
            break;

        default:
            loginUIControls = <button className="btn btn-outline-success" type="submit">Login</button>
    }
        return (
            <div className ={ styles.container }>
                <form onSubmit={submitHandler}>
                    <div>
                   
                        <div>
                            <div>Mail</div>
                            <input type="text"
                                   placeholder="Your mail"
                                   name="mail"
                                    />
                        </div>
                        <div>
                            <div>Password</div>
                            <input type="password"
                                   placeholder="Password"
                                   name="psw"
                                   />
                        </div>
                    </div>
                    <div>
                        { loginUIControls }
                    </div>
                 
                    <Link to = 'createUser'><button className="btn btn-outline-success">Sign up</button></Link>
                </form>
            </div>
        )
    }

