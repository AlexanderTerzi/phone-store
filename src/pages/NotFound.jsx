import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";
import { selectTranslations } from '../redux/slices/i18nextSlice';

const NotFound = () => {
    const t = useSelector(selectTranslations);

    return (
        <div className="not-found">
            <h1>
                <span>😕</span>
                <br />
                {t.page404Title}
            </h1>
            <p className="not-found__text">
                {t.page404Text}
            </p>
            <Link to="/" className="button button--not-found">
                {t.back404}
            </Link>
        </div>
    );
};

export default NotFound;