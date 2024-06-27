import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import ContentTitleContainer from '../../containers/resume/ContentTitleContainer';


const Resume = () => {
  return (
    <>
      <Header />
      <ContentTitleContainer />
      <Footer />
    </>
  )
}

export default Resume