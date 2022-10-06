import React from 'react';

import { useTranslation } from 'react-i18next';

const Categories = ({ activeCategory, setActiveCategory }) => {
    const { t } = useTranslation();

    const categories = t("categories", { returnObjects: true });

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