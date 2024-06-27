import React from 'react'

const BtnLong = ({btnLongText}) => {
    return (
        <div>
            <button className="btn-long">
                <a href=""
                    style={{ textDecorationLine: 'none', color: 'white', display: 'block' }}>{btnLongText}</a>
            </button>
        </div>
    )
}

export default BtnLong