import React from 'react'

const BtnLong = ({btnLongText}) => {
    return (
        <div>
            <button className="btn-long" style={{ textDecorationLine: 'none', color: 'white', display: 'block' }}>
                    {btnLongText}
            </button>
        </div>
    )
}

export default BtnLong