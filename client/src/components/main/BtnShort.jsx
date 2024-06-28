import React from 'react'

const BtnShort = ({ btnShortText }) => {
  return (
    <div>
      <button className="btn-short" style={{ textDecorationLine: 'none', color: 'white' , display: 'block' }}>
          { btnShortText }
      </button>
    </div>
  )
}

export default BtnShort