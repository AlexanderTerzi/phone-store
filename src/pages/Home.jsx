import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PhoneBlock from '../components/PhoneBlock';
import Loader from '../components/Loader';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeSort, setActiveSort] = useState({ name: 'популярности (убыв)', sortProperty: '-rating' });
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    useEffect(() => {
        setLoading(true);

        const category = activeCategory > 0 ? `&category=${activeCategory}` : '';
        const sortBy = `sortBy=${activeSort.sortProperty.replace('-', '')}`;
        const order = `order=${activeSort.sortProperty.includes('-') ? 'desc' : 'asc'}`;
        const search = searchValue ? `search=${searchValue}` : '';
        const pagination = `page=${currentPage}&limit=${itemsPerPage}`;

        axios.get(`https://6331ae2c3ea4956cfb64b9b1.mockapi.io/products?${pagination}&${category}&${sortBy}&${order}&${search}`)
            .then((res) => {
                setProducts(res.data.items);
                setProductsCount(res.data.count)
                setLoading(false);
            });
    }, [activeCategory, activeSort, searchValue, currentPage]);

    const skeletons = [...new Array(8)].map((_, index) => <Loader key={index} />)
    const goods = products.map((obj) => <PhoneBlock key={obj.id} {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} setActiveCategory={(index) => setActiveCategory(index)} />
                <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <h2 className="content__title">Все смартфоны</h2>
            <Sort activeSort={activeSort} setActiveSort={(index) => setActiveSort(index)} />
            <div className="content__items">
                {loading ? skeletons : goods}
            </div>
            <Pagination
                onChangePage={(num) => setCurrentPage(num)}
                productsCount={productsCount}
                itemsPerPage={itemsPerPage}
            />
        </div >
    );
};

export default Home;