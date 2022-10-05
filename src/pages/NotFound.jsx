import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className="not-found__text">
                К сожалению данная страница отсутствует в нашем интернет-магазине
            </p>
            <Link to="/" className="button button--not-found">
                Назад
            </Link>
        </div>
    );
};

export default NotFound;