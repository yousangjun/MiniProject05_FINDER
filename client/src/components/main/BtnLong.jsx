import React from 'react'

const BtnLong = ({btnLongText, onClick, btnType}) => {
    return (
        <div>
            <button className="btn-long"
                    style={{ textDecorationLine: 'none', color: 'white', display: 'block' }} 
                    onClick={onClick}
                    type={btnType}>

                    {btnLongText}
            </button>
        </div>
    )
}

export default BtnLong