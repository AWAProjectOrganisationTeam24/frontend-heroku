import React  from 'react';
import axios from "axios";
import styles from './Login.module.css';
import Constants from "./Constants.json";

function CreateUser() {
    const [state, setState] = React.useState({
        firstname: '',
        lastname: '',
        mail: '',
        psw: '',
        address: '',
        city: ''
    })

    function changeHandler(e) {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
    }
    function submitHandler(e) {
        e.preventDefault();

        //send it to backend + ensure if goes bad
        //get response from backend - after login show homepage
        axios.post(Constants.API_ADDRESS + "/register", {
            firstname: state.firstname,
            lastname: state.lastname,
            mail: state.mail,
            psw: state.psw,
            address: state.address,
            city: state.city
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
        return (
            <div>
                <div className={styles.container}>
                    <h1 className={styles.h1}>Create User</h1>
                    <form onSubmit={submitHandler}>
                        <table>
                            <tr>
                                <td>Firstname</td>
                                <input type="text"
                                       name="firstname"
                                       value={state.firstname}
                                       onChange={changeHandler}/>
                            </tr>
                            <tr>
                                <td>Lastname</td>
                                <input type="text"
                                       name="lastname"
                                       value={state.lastname}
                                       onChange={changeHandler}/>
                            </tr>
                            <tr>
                                <td>Mail</td>
                                <input type="text"
                                       name="mail"
                                       value={state.mail}
                                       onChange={changeHandler}/>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <input type="text"
                                       name="psw"
                                       value={state.psw}
                                       onChange={changeHandler}/>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <input type="text"
                                       name="address"
                                       value={state.address}
                                       onChange={changeHandler}/>
                            </tr>
                            <tr>
                                <td>City</td>
                                <input type="text"
                                       name="city"
                                       value={state.city}
                                       onChange={changeHandler}/>
                            </tr>
                        </table>
                        <button className="btn btn-outline-success" type="submit">Create user</button>
                    </form>
                </div>
            </div>
        )
}
export default CreateUser
