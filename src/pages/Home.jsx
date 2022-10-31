import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';
import { fetchItems } from '../redux/slices/productsSlice';
import { setActiveCategory, setCurrentPage, setFilterParams } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PhoneBlock from '../components/PhoneBlock';
import Loader from '../components/Loader';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import ErrorBlock from '../components/ErrorBlock';
import AnimatedPage from './AnimatedPage';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const t = useSelector(selectTranslations);
    const querySearch = useRef(false);
    const pageMounted = useRef(false);

    const { activeCategory, activeSort, currentPage, itemsPerPage, searchValue } = useSelector(state => state.filter);
    const { items, itemsCount, status } = useSelector(state => state.products);

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
        if (location.search) {
            const filterParams = qs.parse(location.search.substring(1));

            const activeSort = t.sortList.find(obj => obj.sortProperty === filterParams.sortProperty);

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
            const fetchProducts = (async () => {

                const fetchURL = `https://6331ae2c3ea4956cfb64b9b1.mockapi.io/products`;
                const category = activeCategory > 0 ? `&category=${activeCategory}` : '';
                const sortBy = `sortBy=${activeSort.sortProperty.replace('-', '')}`;
                const order = `order=${activeSort.sortProperty.includes('-') ? 'desc' : 'asc'}`;
                const search = searchValue ? `search=${searchValue}` : '';
                const pagination = activeCategory === 0 ? `page=${1}&limit=${itemsPerPage}` : `page=${currentPage}&limit=${itemsPerPage}`;

                dispatch(fetchItems({
                    fetchURL,
                    category,
                    sortBy,
                    order,
                    search,
                    pagination
                }));
            })();
        };

        querySearch.current = false;

    }, [activeCategory, activeSort, searchValue, currentPage]);

    const handleClickCategory = (index) => {
        dispatch(setActiveCategory(index));
    };

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num));
    };

    const skeletons = [...new Array(8)].map((_, index) => <Loader key={index} />)
    const goods = items.map((obj) => <PhoneBlock key={obj.id} {...obj} />)

    return (
        <AnimatedPage>
            <div className="container">
                <div className="content__top">
                    <Categories activeCategory={activeCategory} setActiveCategory={handleClickCategory} />
                    <Search searchValue={searchValue} />
                </div>
                {
                    status === 'error'
                        ? <ErrorBlock />
                        : <>
                            <h2 className="content__title">
                                {
                                    searchValue ? `${t.searchTitle}: ${searchValue}...` : `${t.title}`
                                }
                            </h2>
                            <Sort />
                            <div className="content__items">
                                {status === 'loading' ? skeletons : goods}
                            </div>
                            <Pagination
                                onChangePage={onChangePage}
                                productsCount={itemsCount}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                            />
                        </>
                }
            </div >
        </AnimatedPage>
    );
};

export default Home;