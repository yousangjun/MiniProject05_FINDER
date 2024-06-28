import React from 'react'

import HomeContainer from '../containers/main/HomeContainer';
import './Home.css'
import MainLayout from '../layouts/MainLayout';

const Home = ({ }) => {
  return (
    <>
      <MainLayout>
        <HomeContainer/>
      </MainLayout>
    </>
  )
}

export default Home