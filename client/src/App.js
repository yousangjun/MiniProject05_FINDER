import './App.css';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Home from './pages/Home';
import Company from './pages/company/Company';
import { Recruit } from './pages/recruit/Recruit';
import Resume from './pages/resume/Resume';
import User from './pages/user/User';
import Error from './pages/error/Error';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/company" element={<Company/>}></Route>
          <Route path="/recruit" element={<Recruit/>}></Route>
          <Route path="/resume" element={<Resume/>}></Route>
          <Route path="/user" element={<User/>}></Route>
          <Route path="/*" element={<Error/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
