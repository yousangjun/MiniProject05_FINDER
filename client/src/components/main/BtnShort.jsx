import React from 'react';

const BtnShort = ({ btnShortText, onClick }) => {
  return (
    <div>
      <button className="btn-short" style={{ textDecorationLine: 'none', color: 'white', display: 'block' }} onClick={onClick}>
        {btnShortText}
      </button>
    </div>
  );
}

export default BtnShort;