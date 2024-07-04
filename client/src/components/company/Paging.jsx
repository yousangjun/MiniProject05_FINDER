import React from 'react';
import { Link } from 'react-router-dom';
import './css/Paging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const Paging = ({ page, totalPages, onPageChange }) => {
    if (!page) {
        return null;
    }

    // 유효한 페이지 범위인지 검사
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(prev => ({ ...prev, page: newPage }));
        }
    };

    return (
        <div className="pagination-container justify-content-center d-flex mt-4 m-auto">
            <div className="pagination d-flex">
                {/* 맨앞화살표 */}
                <Link className="page-item page-first" to="#" onClick={() => handlePageChange(1)}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </Link>

                {/* 앞화살표 */}
                <Link className="page-item" to="#" onClick={() => handlePageChange(page.page - 1)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Link>

                {/* 페이지네이션 */}
                {[...Array(Math.min(5, totalPages)).keys()].map(i => {
                    const pageNum = page.start + i;
                    if (pageNum > totalPages) return null;
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
                <Link className="page-item page-end" to="#" onClick={() => handlePageChange(totalPages)}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                </Link>
            </div>
        </div>
    );
};

export default Paging;