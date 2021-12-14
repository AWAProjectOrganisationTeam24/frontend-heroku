import   './Header.css';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserAuthContext } from '../Contexts';
import logo from '../logo.PNG';

function Header() {

    const UserAuthContextValue = useContext(UserAuthContext);
    return (
        <div>
            <div className="topnav">
                <a className="active" href="/">
                    <img className="img" src={logo} alt="Logo"/>
                </a>
                <div className="header_right">
                    {UserAuthContextValue.jwt != null ?
                        <div>
                            <Link to={`/profile`}>Profile</Link>
                            <Link to={`/logout`}><button onClick={() => UserAuthContextValue.logout()} >Logout</button></Link>
                        </div>
                        :
                        <>
                        <Link to="/login">Login</Link>
                        <Link to="/login/createUser">Register</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
