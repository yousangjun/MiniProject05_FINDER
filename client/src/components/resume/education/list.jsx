import React from 'react'

const list = () => {
  return (
        <>
            <div className="d-flex flex-column w-100 h-auto">
                {/*    <th:block th:each="employmentHistory : ${employmentHistoryList}"> */}
                <div className="education-card d-flex justify-content-between">
                    <div className="flex-column col-3">
                        {/* <p th:text="${employmentHistory.organization}">기관</p> */}
                        <p></p>
                    </div>
                    <div className="flex-column col-3">
                        {/* <p th:text="${employmentHistory.organization}">기관</p> */}
                        <p></p>
                    </div>
                    <div className="flex-column col-3">
                        {/* <p th:text="${employmentHistory.organization}">기관</p> */}
                        <p></p>
                    </div>
                    {/*
                    <th:block sec:authorize="!hasRole('ROLE_COMPANY') and hasRole('ROLE_USER')">
                    </th:block>
                    */}
                    <div className="flex-column col-3">
                        <button type='button' className='btn del_btn'>
                        {/*        th:onclick="|deleteEmploymentHistory(${employmentHistory.employmentHistoryNo})|"> */}
                        <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
  )
}

export default list