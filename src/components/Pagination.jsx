import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ productsCount, itemsPerPage, onChangePage, currentPage }) => {
    return (
        <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageCount={Math.ceil(productsCount / itemsPerPage)}
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
        />
    );
};

export default Pagination;