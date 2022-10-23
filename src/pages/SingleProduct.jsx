import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { useSelector, useDispatch } from "react-redux";
import { addItem } from '../redux/slices/cartSlice';
import { selectTranslations } from '../redux/slices/languageSlice';

import { BsCart4 } from "react-icons/bs";
import Loader from '../components/Loader';

const SingleProduct = () => {
    const { id } = useParams();
    const t = useSelector(selectTranslations);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [singleItem, setSingleItem] = useState();

    const itemCount = useSelector(state => state.cart.items.filter(obj => obj.id === id));

    const [activeColor, setActiveColor] = useState(0);
    const [activeMemory, setActiveMemory] = useState(0);

    useEffect(() => {
        const fetchSingleProduct = (async () => {
            try {
                const res = await axios.get(`https://6331ae2c3ea4956cfb64b9b1.mockapi.io/products/${id}`)
                setSingleItem(res.data.items);
            } catch (error) {
                console.log(error);
                navigate('/');
            }
        })();
    }, [])

    const handleClickColor = (item) => {
        setActiveColor(singleItem.colors.indexOf(item));
    };

    const handleClickMemory = (item) => {
        setActiveMemory(singleItem.memory.indexOf(item));
    };

    const handleClickAdd = () => {
        const item = {
            id: singleItem.id,
            title: singleItem.title,
            imageUrl: singleItem.imageUrl,
            alt: singleItem.alt,
            currentPrice,
            color: singleItem.colors[activeColor],
            memory: singleItem.memory[activeMemory].capacity
        }

        dispatch(addItem(item));
    }

    const currentPrice = singleItem ? singleItem.memory[activeMemory].price : 0;
    const count = itemCount ? itemCount.reduce((sum, obj) => obj.count + sum, 0) : null;

    if (!singleItem) {
        return <Loader />
    }

    return (
        <div className="single-block">
            <h4 className="single-block__title">{singleItem.title}</h4>
            <div className="single-item">
                <img className="single-item__image" src={`.${singleItem.imageUrl}`} alt={singleItem.alt} />
                <div className="single-item__description">
                    <p className="single-item__text">
                        {singleItem.description}
                    </p>
                    <div className="single-item__selector">
                        <span>
                            {t.color}:
                        </span>
                        <ul>
                            {singleItem.colors && singleItem.colors.map((item, index) => (
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
                            {singleItem.memory && singleItem.memory.map((item, index) => (
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
                    <div className="single-item__bottom">
                        <div className="single-item__price">
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
                                count > 0 && <i>{count}</i>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;