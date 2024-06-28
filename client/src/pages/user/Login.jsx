import React from 'react'
import LoginContainer from '../../containers/user/LoginContainer'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'

const Login = () => {
  return (
    <>
      <Header/>
        <LoginContainer/>
      <Footer/>
    </>
  )
}

export default Login