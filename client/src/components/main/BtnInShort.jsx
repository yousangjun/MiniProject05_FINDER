import React from 'react'

const BtnInShort = ({ btnInShortText }) => {
    return (
        <div>
            <button className="btn-in-short">
                <a href=""
                    style={{ textDecorationLine: 'none', color: 'white', display: 'block' }}>{btnInShortText}</a>
            </button>
        </div>
    )
}

export default BtnInShort