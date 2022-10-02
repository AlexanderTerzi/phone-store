import React from 'react';

import logo from '../assets/img/logo.png'
import { BsCart4 } from "react-icons/bs";

const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="header__logo">
                    <img width="52" src={logo} alt="Phone logo" />
                    <div>
                        <h1>Phone store</h1>
                        <p>Smartphones and Mobile Phones</p>
                    </div>
                </div>
                <div className="header__cart">
                    <a href="/cart.html" className="button button--cart">
                        <span>520 ₴</span>
                        <div className="button__delimiter"></div>
                        <BsCart4 />
                        <span>3</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;