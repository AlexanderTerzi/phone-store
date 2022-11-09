import React from 'react';
import ReactPaginate from 'react-paginate';

interface IPaginationProps {
    productsCount: number;
    itemsPerPage: number;
    onChangePage: (page: number) => void;
    currentPage: number;
};

const Pagination: React.FC<IPaginationProps> = ({ productsCount, itemsPerPage, onChangePage, currentPage }) => {
    return (
        <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageCount={Math.ceil(productsCount / itemsPerPage)}
            forcePage={currentPage - 1}
        />
    );
};

export default Pagination;