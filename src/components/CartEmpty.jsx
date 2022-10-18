import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
    const t = useSelector(selectTranslations);

    return (
        <>
            <div className="cart cart--empty">
                <h2>
                    {t.emptyCartTitle}
                    <span className="cart--empty__icon">
                        😕
                    </span>
                </h2>
                <p>
                    {t.emptyCartTextOne}
                    <br />
                    {t.emptyCartTextTwo}
                </p>
                <img src={cartEmptyImg} alt="Empty cart" />
                <Link to="/" className="button button--empty">
                    <span>
                        {t.emptyCartButton}
                    </span>
                </Link>
            </div>
        </>
    );
};

export default CartEmpty;