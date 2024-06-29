import React from 'react'

const ContentHeader = () => {
    return (
        <form action="" method="get" className="job-header">
            <div style={{ padding: '15px' }}>
                <strong>지원한 채용공고</strong>
            </div>
            <div className="d-flex justify-content-end align-items-center me-3 mb-2">
                {/* 필요 시 여기에 다른 요소를 추가할 수 있습니다 */}
            </div>
        </form>
    )
}

export default ContentHeader