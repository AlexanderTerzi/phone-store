import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="not-found">
            <h1>
                <span>😕</span>
                <br />
                {t('page404Title')}
            </h1>
            <p className="not-found__text">
                {t('page404Text')}
            </p>
            <Link to="/" className="button button--not-found">
                {t('back404')}
            </Link>
        </div>
    );
};

export default NotFound;