import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { selectTranslations } from '../redux/slices/i18nextSlice';
import { setActiveCategory, setCurrentPage, setFilterParams } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PhoneBlock from '../components/PhoneBlock';
import Loader from '../components/Loader';
import Search from '../components/Search';
import Pagination from '../components/Pagination';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const t = useSelector(selectTranslations);
    const querySearch = useRef(false);
    const pageMounted = useRef(false);

    const { activeCategory, activeSort, currentPage, itemsPerPage } = useSelector(state => state.filter);

    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');


    // If there was a first render, and parameters have been changed
    useEffect(() => {
        if (pageMounted.current) {
            const queryString = qs.stringify({
                sortProperty: activeSort.sortProperty,
                activeCategory,
                currentPage
            });

            navigate(`?${queryString}`);
        }

        pageMounted.current = true;

    }, [activeCategory, activeSort, currentPage])

    // /If there was a first render, chech URL-parameters and save in Redux
    useEffect(() => {
        if (window.location.search) {
            const filterParams = qs.parse(window.location.search.substring(1));

            const activeSort = t.sortList.find(obj => obj.sortProperty === filterParams.sortProperty)

            dispatch(setFilterParams({
                ...filterParams,
                activeSort
            }));

            querySearch.current = true;
        }
    }, [])

    //Fetch products
    useEffect(() => {
        if (!querySearch.current) {
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
        }

        querySearch.current = false;

    }, [activeCategory, activeSort, searchValue, currentPage]);

    const handleClickCategory = (index) => {
        dispatch(setActiveCategory(index));
    };

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num));
    };

    const skeletons = [...new Array(8)].map((_, index) => <Loader key={index} />)
    const goods = products.map((obj) => <PhoneBlock key={obj.id} {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={activeCategory} setActiveCategory={handleClickCategory} />
                <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <h2 className="content__title">{t.title}</h2>
            <Sort />
            <div className="content__items">
                {loading ? skeletons : goods}
            </div>
            <Pagination
                onChangePage={onChangePage}
                productsCount={productsCount}
                itemsPerPage={itemsPerPage}
            />
        </div >
    );
};

export default Home;