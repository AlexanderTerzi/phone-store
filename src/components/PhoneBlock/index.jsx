import React, { useState } from 'react';

import { useSelector } from "react-redux";
import { selectTranslations } from '../../redux/slices/i18nextSlice';

import { BsCart4 } from "react-icons/bs";

const PhoneBlock = ({ title, imageUrl, alt, colors, memory }) => {
    const [activeColor, setActiveColor] = useState(0);
    const [activeMemory, setActiveMemory] = useState(0);
    const t = useSelector(selectTranslations);

    const handleClickColor = (item) => {
        setActiveColor(colors.indexOf(item));
    };

    const handleClickMemory = (item) => {
        setActiveMemory(memory.indexOf(item));
    };

    const currentPrice = memory[activeMemory].price;

    return (
        <div className="phone-block">
            <img className="phone-block__image" src={imageUrl} alt={alt} />
            <h4 className="phone-block__title">{title}</h4>
            <div className="phone-block__selector">
                <span>
                    {t.color}:
                </span>
                <ul>
                    {colors && colors.map((item, index) => (
                        <li
                            key={`${index}_${item}`}
                            className={activeColor === index ? 'active' : ''}
                            onClick={() => handleClickColor(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <span>
                    {t.memory}:
                </span>
                <ul>
                    {memory && memory.map((item, index) => (
                        <li
                            key={`${index}_${item.capacity}`}
                            className={activeMemory === index ? 'active' : ''}
                            onClick={() => handleClickMemory(item)}
                        >
                            {item.capacity} GB
                        </li>
                    ))}
                </ul>
            </div>
            <div className="phone-block__bottom">
                <div className="phone-block__price">
                    <span>{t.priceTitle}:</span>
                    {currentPrice} ₴
                </div>
                <div className="button button--outline button--add">
                    <BsCart4 />
                    <span>{t.addButton}</span>
                    <i>0</i>
                </div>
            </div>
        </div>
    );
};

export default PhoneBlock;