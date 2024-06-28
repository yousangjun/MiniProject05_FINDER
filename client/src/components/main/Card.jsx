import React from 'react';
import BtnShort from './BtnShort'; // 예시로 사용한 버튼 컴포넌트

const Card = ({ data }) => {
  // console.log(data);
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="recruit-list">
      {data.map((item, index) => (

        <div className="col" key={index} data-recruit-id={item.recruitNo}>
          <div className="card" style={{ borderRadius: 20, boxShadow: '-4px 8px 20px rgba(0, 0, 0, 0.1)' }}>
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <div className="card-title">
                  {
                    item.fileNo > 0 ? (
                      <img src={`/file/img/${item.fileNo}`} alt="썸네일" style={{ width: '75px', height: '75px' }} />
                    ) : (
                      <img src="/img/no-image.png" alt="썸네일" style={{ width: 75, height: 75 }} />
                    )
                  }
                </div>
                <input type="hidden" name="recruitNo" value={item.recruitNo} />
                <p className="card-text" style={{ fontSize: 12 }}>{item.company.comName}</p>
              </div>
              <strong>{item.recruitTitle}</strong>
              <div className="keyword-span">
                {item.keywordList && item.keywordList.length > 0 ? (

                  <div className="span-wrapper">
                    {item.keywordList.map((keyword, index) => (
                      <span key={index}>{keyword.recruitKeyword}</span>
                    ))}
                  </div>
                ) : (
                  <p>키워드가 존재하지 않습니다.</p>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <div>{item.recruitRegDate}</div>
                <BtnShort btnShortText="조회" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
