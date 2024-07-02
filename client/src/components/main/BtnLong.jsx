import React from 'react'

const BtnLong = ({btnLongText, handleBtnLongClick}) => {
    return (
        <div>
            <button className="btn-long" style={{ textDecorationLine: 'none', color: 'white', display: 'block' }} onClick={handleBtnLongClick}>
                    {btnLongText}
            </button>
        </div>
    )
}

export default BtnLong