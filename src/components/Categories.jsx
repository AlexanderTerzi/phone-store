import React, { useState } from 'react';

const categories = ['Все', 'Apple', 'Samsung', 'Huawei', 'Motorola', 'Xiaomi']

const Categories = () => {
    const [activeCategory, setActiveCategory] = useState(0);

    const handleClickCategory = (index) => {
        setActiveCategory(index);
    }

    return (
        <div className="categories">
            <ul>
                {categories && categories.map((item, index) => (
                    <li
                        key={`${index}_${item}`}
                        className={activeCategory === index ? 'active' : ''}
                        onClick={() => handleClickCategory(index)}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;