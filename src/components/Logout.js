import React, { useState, useContext } from 'react';
import styles from './Login.module.css';
import {UserAuthContext} from './Contexts'
import Header from "./partials/Header";


export default function Login(props) {

    localStorage.clear();
    const UserAuthContextValue = useContext(UserAuthContext);

        return (
            <>
            <Header/>
            <div className ={ styles.container }>

                <div>You have been logged out</div>
            </div>
            </>
        )

}

