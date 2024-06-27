import React from 'react'
import BtnShort from '../components/main/BtnShort'

const Home = () => {
  return (

    <div className="col" data-recruit-id="">
      <div className="card" style={{ borderRadius: 20, boxShadow: '-4px 8px 20px rgba(0, 0, 0, 0.1)' }}>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <div className="card-title">
              <img src="/img/no-image.png" alt="썸네일" style={{ width: 75, height: 75 }} />
            </div>
            <input type="hidden" name="recruitNo" />
            <p className="card-text" style={{ fontSize: 12 }}></p>
          </div>
          <strong></strong>
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
            <div></div>
            <BtnShort btnShortText="조회" />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home