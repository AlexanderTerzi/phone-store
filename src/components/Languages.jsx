import React, { useState, useRef, useEffect } from 'react';

import { GrLanguage } from "react-icons/gr";

import { useSelector, useDispatch } from "react-redux";
import { selectTranslations } from '../redux/slices/languageSlice';
import { setLang } from '../redux/slices/languageSlice';

const Languages = () => {
    const t = useSelector(selectTranslations);
    const dispatch = useDispatch();
    const [openLanguage, setOpenLanguage] = useState(false);
    const languageRef = useRef();

    const handleOpenLanguage = () => {
        setOpenLanguage(!openLanguage);
    };

    const handleOutsideClick = (e) => {
        if (!e.path.includes(languageRef.current)) {
            setOpenLanguage(false);
        };
    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    const supportedLangs = useSelector((state) => state.language.supportedLangs);

    const currentLang = useSelector((state) => state.language.lang);

    return (
        <div
            className="languages"
            title="Choose language"
            ref={languageRef}
            onClick={handleOpenLanguage}
        >
            <GrLanguage className="languages__icon" />
            <span className="languages__value">
                {currentLang}
            </span>
            <ul className={openLanguage ? `languages__popup active` : "languages__popup"}>

                {Object.entries(supportedLangs).map(([code, name]) => (
                    <li
                        key={code}
                        className={currentLang === code ? 'active' : ''}
                        onClick={() => dispatch(setLang(code))}

                    >
                        {name}
                    </li>

                ))}
            </ul>
            <svg
                className={openLanguage ? 'languages__arrow rotate' : 'languages__arrow'}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                />
            </svg>
        </div>
    );
};

export default Languages;