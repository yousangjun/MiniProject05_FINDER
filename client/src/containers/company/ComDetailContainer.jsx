import React from 'react'
import ComDetail1 from '../../components/company/ComDetail1'
import ComDetail2 from '../../components/company/ComDetail2'
import ComDetailChart from '../../components/company/ComDetailChart'

const ComDetailContainer = () => {
  return (
    <div className='container'>
      {/* <BtnShort btnShortText={"제출"} />
      <BtnLong btnLongText={"안녕하세요"} /> */}
      <ComDetail1 />
      <ComDetail2 />
      <ComDetailChart />
    </div>
  )
}

export default ComDetailContainer