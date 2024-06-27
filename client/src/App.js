import './App.css';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Home from './pages/Home';
import Company from './pages/company/Company';
import Checkout from './pages/company/checkout';
import Com_detail_user from './pages/company/com_detail_user';
import Credit_com from './pages/company/credit_com';
import Credit_detail_com from './pages/company/credit_detail_com';
import { Recruit } from './pages/recruit/Recruit';
import Resume from './pages/resume/Resume';
import User from './pages/user/User';
import Error from './pages/error/Error';


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
          
          {/* 채용공고 페이지 */}
          <Route path="/recruit" element={<Recruit/>}></Route>

          {/* 이력서 페이지 */}
          <Route path="/resume" element={<Resume/>}></Route>

          {/* 회원 페이지 */}
          <Route path="/user" element={<User/>}></Route>
          <Route path="/*" element={<Error/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
