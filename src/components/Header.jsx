import React from 'react';

import { useSelector } from 'react-redux';

import logo from '../assets/img/logo.png'
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Languages from './Languages';

const Header = () => {
    const { totalPrice, totalCount } = useSelector(state => state.cart);

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
                <div className="header__right">
                    <Languages />
                    <div className="header__cart">
                        <Link to="/cart" className="button button--cart">
                            <span>
                                {totalPrice} ₴
                            </span>
                            <div className="button__delimiter"></div>
                            <BsCart4 />
                            <span>
                                {totalCount}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;