import React from 'react'

const RecruitListBtn = ({ContentListItemText}) => {
    return (
        <div>
            <button
                type="button"
                className="btn-short1"
                id="btn-stop"
                data-recruit-no=""
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                <strong>{ContentListItemText}</strong>
            </button>
        </div>
    )
}

export default RecruitListBtn