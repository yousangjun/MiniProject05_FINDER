import React from 'react'


import BtnShort from './BtnShort';

const Card = (recruitList) => {
  return (

    <div className="col" data-recruit-id="">
      <div className="card" style={{ borderRadius: 20, boxShadow: '-4px 8px 20px rgba(0, 0, 0, 0.1)' }}>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <div className="card-title">
              <img src="/img/no-image.png" alt="썸네일" style={{ width: 75, height: 75 }} />
            </div>
            <input type="hidden" name="recruitNo" />
            <p className="card-text" style={{ fontSize: 12 }}>여기에 회사이름 들옴</p>
          </div>
          <strong>여기에 제목이 들어옵니다</strong>
          {/* <div className="keyword-span">
            {keywords.length > 0 ? (
              <div className="span-wrapper">
                {keywords.map((keyword, index) => (
                  <span key={index}>{keyword}</span>
                ))}
              </div>
            ) : (
              <p>키워드가 존재하지 않습니다.</p>
            )}
          </div> */}
          <div className="d-flex justify-content-between">
            <div>여기에 날짜가 들어옴</div>
            <BtnShort btnShortText="조회" />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Card