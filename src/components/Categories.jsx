import React from 'react';

const categories = ['Все', 'Apple', 'Samsung', 'Huawei', 'Motorola', 'Xiaomi'];

const Categories = ({ activeCategory, setActiveCategory }) => {
    return (
        <div className="categories">
            <ul>
                {categories && categories.map((item, index) => (
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