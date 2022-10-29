import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from "react-redux";
import { selectTranslations } from '../redux/slices/languageSlice';

import AnimatedPage from './AnimatedPage';
import notFoundImg from '../assets/img/not-found.png';


const NotFound = () => {
    const t = useSelector(selectTranslations);

    return (
        <AnimatedPage>
            <div className="not-found">
                <h1>
                    {t.page404Title}
                </h1>
                <p className="not-found__text">
                    {t.page404Text}
                </p>
                <img src={notFoundImg} alt="404" />
                <Link to="/" className="button button--not-found">
                    {t.back404}
                </Link>
            </div>
        </AnimatedPage>
    );
};

export default NotFound;