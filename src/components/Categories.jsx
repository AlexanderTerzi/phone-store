import React from 'react';

import { useSelector } from "react-redux";
import { selectTranslations } from '../redux/slices/languageSlice';

const Categories = ({ activeCategory, setActiveCategory }) => {
    const t = useSelector(selectTranslations);

    const categories = t.categories;

    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li
                        key={`${index}_${item}`}
                        className={activeCategory === index ? 'active' : ''}
                        onClick={() => setActiveCategory(index)}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;