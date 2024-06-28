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

import Introduce_com from './pages/resume/Introduce_com';
import Login from './pages/user/Login';



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

          {/* 이력서 페이지 */}
          <Route path="/resume" element={<Resume/>}></Route>

          {/* 회원 페이지 */}
          <Route path="/user" element={<User/>}></Route>
          <Route path="/*" element={<Error/>}></Route>

          {/*로그인 페이지 */}
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
