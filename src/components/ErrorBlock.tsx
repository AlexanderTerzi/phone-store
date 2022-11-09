import React from 'react';

import { useSelector } from "react-redux";
import { selectTranslations } from '../redux/slices/languageSlice';

import errorImg from '../assets/img/error.png';

const ErrorBlock: React.FC = () => {
    const t = useSelector(selectTranslations);

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div className="error--block">
            <h2 className="error--block__title">
                {t.errorTitle}
            </h2>
            <p className="error--block__text">
                {t.errorText}
            </p>
            <img src={errorImg} alt="Error" />
            <button
                onClick={refreshPage}
                className="button button--empty">
                <span>
                    {t.errorButton}
                </span>
            </button>
        </div>
    );
};

export default ErrorBlock;