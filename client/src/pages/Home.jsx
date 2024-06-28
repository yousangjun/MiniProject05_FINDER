import React from 'react'

import HomeContainer from '../containers/main/HomeContainer';
import './Home.css'
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const Home = ({ }) => {
  return (
    <body>
      <Header/>
      <HomeContainer/>
      <Footer/>
    </body>

  )
}

export default Home