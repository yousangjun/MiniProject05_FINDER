import React from 'react'

const BtnInShort = ({ btnInShortText }) => {
    return (
        <div>
            <button className="btn-in-short" style={{ textDecorationLine: 'none', color: 'white', display: 'block' }}>
                {btnInShortText}
            </button>
        </div>
    )
}

export default BtnInShort