import React from 'react'

const KeywordItem = ({ keywords }) => {
    return (
        <div className="keyword-span1">
            <div className="span-wrapper">
                {keywords.map((keyword, index) => (
                    <span key={index}>{keyword}</span>
                ))}
            </div>
        </div>
    )
}

export default KeywordItem