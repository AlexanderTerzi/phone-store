import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'qs';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { selectTranslations } from '../redux/slices/languageSlice';
import { fetchItems, selectProducts, Status } from '../redux/slices/productsSlice';
import { selectFilter, setActiveCategory, setCurrentPage, setFilterParams, SortType } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PhoneBlock from '../components/PhoneBlock';
import Loader from '../components/Loader';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import ErrorBlock from '../components/ErrorBlock';
import AnimatedPage from './AnimatedPage';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const t = useSelector(selectTranslations);
    const querySearch = useRef(false);
    const pageMounted = useRef(false);

    const { activeCategory, activeSort, currentPage, itemsPerPage, searchValue } = useSelector(selectFilter);
    const { items, itemsCount, status } = useSelector(selectProducts);

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

            const activeSort: SortType = t.sortList.find((obj: { sortProperty: string }) => obj.sortProperty === filterParams.sortProperty);

            //@ts-ignore
            dispatch(setFilterParams({
                ...filterParams,
                activeSort,
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
                const pagination = activeCategory === 0 ? `page=${currentPage}&limit=${itemsPerPage}` : `page=${1}&limit=${itemsPerPage}`;


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

    const handleClickCategory = useCallback((index: number) => {
        dispatch(setActiveCategory(index));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const skeletons = [...new Array(8)].map((_, index) => <Loader key={index} />)
    const goods = items.map((obj: any) => <PhoneBlock key={obj.id} {...obj} />)

    return (
        <AnimatedPage>
            <div className="container">
                <div className="content__top">
                    <Categories activeCategory={activeCategory} setActiveCategory={handleClickCategory} />
                    <Search />
                </div>
                {
                    status === Status.ERROR
                        ? <ErrorBlock />
                        : <>
                            <h2 className="content__title">
                                {
                                    searchValue ? `${t.searchTitle}: ${searchValue}...` : `${t.title}`
                                }
                            </h2>
                            <Sort activeSort={activeSort} />
                            <div className="content__items">
                                {status === Status.LOADING ? skeletons : goods}
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