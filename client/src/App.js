import './App.css';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Home from './pages/Home';
import Company from './pages/company/Company';
import Checkout from './pages/company/checkout';
import Com_detail_user from './pages/company/com_detail_user';
import Credit_com from './pages/company/credit_com';
import Credit_detail_com from './pages/company/credit_detail_com';
import Success from './pages/company/success';
import Fail from './pages/company/fail';
import Credit_list_com from './pages/company/credit_list_com';
import { Recruit } from './pages/recruit/Recruit';
import Resume from './pages/resume/Resume';
import User from './pages/user/User';
import Error from './pages/error/Error';
import LoginContextProvider from './contexts/LoginContextProvider';

import Introduce_com from './pages/resume/Introduce_com';
import Login from './pages/user/Login';

import CvCreate_user from './pages/resume/CvCreate_user';

import Join_user from './pages/user/join_user';
import Join_com from './pages/user/join_com';




function App() {
  return (
    <BrowserRouter>
    <LoginContextProvider>    {/* 로그인, 로그아웃 관련 context */}
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          {/* 기업 페이지 */}
          <Route path="/company" element={<Company/>}></Route>
          <Route path="/company/com_detail_user" element={<Com_detail_user/>}></Route>
          <Route path="/company/credit_com" element={<Credit_com/>}></Route>
          <Route path="/company/credit_detail_com" element={<Credit_detail_com/>}></Route>
          <Route path="/company/checkout" element={<Checkout/>}></Route>
          <Route path="/company/Introduce_Com" element={<Introduce_com/>}></Route>
          <Route path="/company/success" element={<Success/>}></Route>
          <Route path="/company/fail" element={<Fail/>}></Route>
          <Route path="/company/credit_list_com" element={<Credit_list_com/>}></Route>

          
          {/* 채용공고 페이지 */}
          <Route path="/recruit" element={<Home/>}></Route>

          {/* 이력서 페이지 */}
          <Route path="/resume" element={<Resume/>}></Route>
          <Route path="/resume/cvCreate_user" element={<CvCreate_user/>}></Route>


          {/* 회원 페이지 */}
          <Route path="/user" element={<User/>}></Route>
          <Route path="/*" element={<Error/>}></Route>

          {/*로그인 페이지 */}
          <Route path="/login" element={<Login/>}></Route>
          {/* 회원가입 페이지 */}
          <Route path="/join_user" element={<Join_user/>}></Route>
          <Route path="/join_com" element={<Join_com/>}></Route>
        </Routes>
        </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
