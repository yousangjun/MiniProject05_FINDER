import React, { useEffect, useState } from 'react'
import Card from './Card'

const CardList = () => {
  // const [page, setPage] = useState(1);
  // const [rows, setRows] = useState(10);
  const [recruitList, setRecruitList] = useState([]);
  // const [code, setCode] = useState(null);
  // const [keyword, setKeyword] = useState('');

  // useEffect(() => {
  //   fetchRecruitList();
  // }, [page, rows]);

  // const fetchRecruitList = async () => {
  //   try {
  //     const response = await axios.get('/cardList', {
  //       params: { page, rows, code, keyword }
  //     });
  //     setRecruitList(response.data.recruitList);
  //   } catch (error) {
  //     console.error('Error fetching recruit list:', error);
  //   }
  // };

  // useEffect(() => {

  // }, [setCardList])

  return (
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4" id="recruit-list">
      <Card recruitList={recruitList} />
    </div>
  )
}

export default CardList