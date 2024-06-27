import React from 'react'

const BtnShort = ({ btnShortText }) => {
  return (
    <div>
      <button className="btn-short">
        <a href=""
          style={{ textDecorationLine: 'none', color: 'white' , display: 'block' }}>{ btnShortText }</a>
      </button>
    </div>
  )
}

export default BtnShort