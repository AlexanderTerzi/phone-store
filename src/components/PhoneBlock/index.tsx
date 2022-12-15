import React, { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { selectTranslations } from '../../redux/slices/languageSlice';
import { addItem, CartItemType, selectCart } from '../../redux/slices/cartSlice';

import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';

interface IPhoneBlockProps {
    id: number | string;
    title: string;
    imageUrl: string;
    alt: string;
    colors: string[];
    memory: {
        capacity: number;
        price: number;
    }[];
}

const PhoneBlock: React.FC<IPhoneBlockProps> = ({ id, title, imageUrl, alt, colors, memory }) => {
    const t = useSelector(selectTranslations);
    const dispatch = useDispatch();

    const itemCount = useSelector(selectCart).items.filter((obj: { id: string | number }) => obj.id === id);

    const [activeColor, setActiveColor] = useState(0);
    const [activeMemory, setActiveMemory] = useState(0);

    const handleClickColor = (item: string) => {
        setActiveColor(colors.indexOf(item));
    };

    const handleClickMemory = (obj: { capacity: number; price: number; }) => {
        setActiveMemory(memory.indexOf(obj));
    };

    const handleClickAdd = () => {
        const item: CartItemType = {
            id,
            title,
            imageUrl,
            alt,
            currentPrice,
            color: colors[activeColor],
            memory: memory[activeMemory].capacity,
            count: 0
        }

        dispatch(addItem(item));
    }

    const currentPrice = memory[activeMemory].price;
    const count = itemCount ? itemCount.reduce((sum: number, obj: any) => obj.count + sum, 0) : null;

    return (
        <div className="phone-block">
            <Link to={`products/${id}`}>
                <img className="phone-block__image" src={`${process.env.PUBLIC_URL}/${imageUrl}`} alt={alt} />
                <h4 className="phone-block__title">{title}</h4>
            </Link>
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
                <div
                    onClick={handleClickAdd}
                    className="button button--outline button--add">
                    <BsCart4 />
                    <span>
                        {t.addButton}
                    </span>
                    {
                        count ? count > 0 && <i>{count}</i> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default PhoneBlock;