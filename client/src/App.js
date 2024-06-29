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
import Detail_jobs_user from './pages/recruit/detail_jobs_user';


import Resume from './pages/resume/Resume';
import User from './pages/user/User';
import Error from './pages/error/Error';

import Introduce_com from './pages/resume/Introduce_com';
import Login from './pages/user/Login';

import CvCreate_user from './pages/resume/CvCreate_user';


import Join_user from './pages/user/join_user';
import Join_com from './pages/user/join_com';
import CvReadContainer_user from './containers/resume/CvReadContainer_user';
import Post_jobs_com from './pages/resume/Post_jobs_com';
import CvRead_user from './pages/resume/CvRead_user';





function App() {
  return (
    <BrowserRouter>
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
          <Route path="/recruit/detail_jobs_user" element={<Detail_jobs_user/>}></Route>
          <Route path="/recruit/post_jobs_com" element={<Post_jobs_com/>}></Route>


          {/* 이력서 페이지 */}
          <Route path="/resume" element={<Resume/>}></Route>
          <Route path="/resume/cvCreate_user" element={<CvCreate_user/>}></Route>
          <Route path="/resume/cvRead_user" element={<CvRead_user/>}></Route>


          {/* 회원 페이지 */}
          <Route path="/user" element={<User/>}></Route>
          <Route path="/*" element={<Error/>}></Route>

          {/*로그인 페이지 */}
          <Route path="/login" element={<Login/>}></Route>
          {/* 회원가입 페이지 */}
          <Route path="/join_user" element={<Join_user/>}></Route>
          <Route path="/join_com" element={<Join_com/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
