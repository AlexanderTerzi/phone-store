import React from 'react';

import logo from '../assets/img/logo.png'
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Languages from './Languages';

const Header = () => {

    return (
        <div className="header">
            <div className="container">
                <Link to="/" className="header__logo">
                    <img src={logo} alt="Phone logo" />
                    <div>
                        <h1>Phone store</h1>
                        <p>Smartphones and Mobile Phones</p>
                    </div>
                </Link>
                <Languages />
                <div className="header__cart">
                    <Link to="/cart" className="button button--cart">
                        <span>520 ₴</span>
                        <div className="button__delimiter"></div>
                        <BsCart4 />
                        <span>3</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;