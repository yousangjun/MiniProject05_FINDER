import React from 'react';
import { Link } from 'react-router-dom';

import './Paging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const Paging = ({ page }) => {
    return (
        <div className="pagination-container justify-content-center d-flex mt-4">
            <div className="pagination d-flex">
                <Link className="page-item page-first" to={`/company/credit/credit_list_com?page=${page.first}`}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </Link>

                {page.page !== page.first && (
                    <Link className="page-item" to={`/company/credit/credit_list_com?page=${page.prev}`}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>
                )}

                {[...Array(page.end - page.start + 1)].map((_, i) => {
                    const pageNum = page.start + i;
                    return pageNum === page.page ? (
                        <b key={i}><span>{pageNum}</span></b>
                    ) : (
                        <Link key={i} to={`/company/credit/credit_list_com?page=${pageNum}`}>{pageNum}</Link>
                    );
                })}

                {page.page !== page.last && (
                    <Link className="page-item" to={`/company/credit/credit_list_com?page=${page.next}`}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                )}

                <Link className="page-item page-end" to={`/company/credit/credit_list_com?page=${page.last}`}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                </Link>
            </div>
        </div>
    );
};

export default Paging;