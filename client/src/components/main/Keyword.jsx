import React, { useState } from 'react'

const Keyword = ({ companyList }) => {
    const [list, setList] = useState(companyList || []);

    return (

        (
            list.map((company) => (
                <div key={company.comNo}>
                    <div className="d-flex company-item" data-id={company.comNo}>여기에 회사이름</div>

                    <div className="company-item">
                        <ul className="item">
                            <li className="d-flex">
                                <div className={`custom-dropdown-item w-50 custom-dropdown-item-${company.comNo}`} data-id={company.comNo}>
                                    <a href={`/company/com_detail_user?comNo=${company.comNo}`}>{company.comName}</a>
                                </div>
                                <ul className="recruit-wrap w-50">
                                    <div className={`item recruit-list-item custom-dropdown-item-${company.comNo}`} data-id={company.comNo}>
                                    
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            ))


        )
    )
}

export default Keyword