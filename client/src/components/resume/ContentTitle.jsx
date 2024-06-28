import React from 'react'
import './css/ContentTitle.css'

const ContentTitle = ({SubTitle1, SubTitle2}) => {
  return (
        <div className='SubTitle'>
            <strong className='title1'>{SubTitle1}</strong>
            <strong className='title2'>{SubTitle2}</strong>
        </div>
  )
}

export default ContentTitle