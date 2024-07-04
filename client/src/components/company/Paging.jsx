import React from 'react';
import { Link } from 'react-router-dom';
import './css/Paging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const Paging = ({ page, onPageChange }) => {
    if (!page) {
        return null;
    }

    const handlePageChange = (newPage) => {
        if (newPage >= page.first && newPage <= page.last) {
            onPageChange(prev => ({ ...prev, page: newPage }));
        }
    };

    return (
        <div className="pagination-container justify-content-center d-flex mt-4 m-auto">
            <div className="pagination d-flex">
                {/* 맨앞화살표 */}
                <Link className="page-item page-first" to="#" onClick={() => handlePageChange(page.first)}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </Link>

                {/* 앞화살표 */}
                <Link className="page-item" to="#" onClick={() => handlePageChange(page.page - 1)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Link>

                {[...Array(page.end - page.start + 1)].map((_, i) => {
                    const pageNum = page.start + i;
                    return pageNum === page.page ? (
                        <b key={i}><span>{pageNum}</span></b>
                    ) : (
                        <Link key={i} className="page-item" to="#" onClick={() => handlePageChange(pageNum)}>{pageNum}</Link>
                    );
                })}

                {/* 뒤화살표 */}
                <Link className="page-item" to="#" onClick={() => handlePageChange(page.page + 1)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </Link>

                {/* 맨뒤화살표 */}
                <Link className="page-item page-end" to="#" onClick={() => handlePageChange(page.last)}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                </Link>
            </div>
        </div>
    );
};

export default Paging;