import React, { useState, useRef, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";

import { setActiveSort, SortType } from '../redux/slices/filterSlice';
import { selectLanguages, selectTranslations } from '../redux/slices/languageSlice';

type SortProps = {
    activeSort: SortType;
}

const Sort: React.FC<SortProps> = React.memo(({ activeSort }) => {
    const dispatch = useDispatch();
    const t = useSelector(selectTranslations);

    const { lang } = useSelector(selectLanguages);

    const [openSort, setOpenSort] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const handleOpenSort = () => {
        setOpenSort(!openSort);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        const _e = e as MouseEvent & {
            path: Node[];
        };

        if (sortRef.current && !_e.path.includes(sortRef.current)) {
            setOpenSort(false);
        };
    };

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);

        return () => document.body.removeEventListener('click', handleOutsideClick);
    }, []);

    useEffect(() => {
        const sortTitle = t.sortList[0].name;
        dispatch(setActiveSort({ name: sortTitle, sortProperty: '-rating' }))
    }, [lang]);

    const handleClickSort = (obj: SortType) => {
        dispatch(setActiveSort(obj));
        setOpenSort(false);
    }

    const sortList: SortType[] = t.sortList;

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                    className={openSort ? 'rotate' : ''}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>{t.sortBy}:</b>
                <span onClick={handleOpenSort}>
                    {activeSort.name}
                </span>
            </div>
            <div className={openSort ? `sort__popup active` : "sort__popup"}>
                <ul>
                    {sortList && sortList.map((item, index) => (
                        <li
                            key={`${index}_${item}`}
                            className={activeSort.sortProperty === item.sortProperty ? 'active' : ''}
                            onClick={() => handleClickSort(item)}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});

export default Sort;