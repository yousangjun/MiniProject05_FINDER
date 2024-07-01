// Header.jsx

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './css/header.css'; // 필요한 CSS 파일 import
import { LoginContext } from '../contexts/LoginContextProvider';

const Header = () => {
  const { isLogin, userInfo, roles, logout } = useContext(LoginContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <Navbar expand="lg" className="navbar">
        <Link to="/" className="navbar-brand">
          <img src={`${process.env.PUBLIC_URL}/img/logo_w.png`} alt="DA E UT 로고" />
        </Link>
        <Navbar.Toggle aria-controls="navbarNav">
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarNav" className={`justify-content-end ${isMenuOpen ? 'show' : ''}`}>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/reservation/reservation">예약</Nav.Link>
            <Nav.Link as={Link} to="/tip/index">팁</Nav.Link>
            {!isLogin ? (
              <Nav.Link as={Link} to="/auth/member">로그인</Nav.Link>
            ) : (
              <>
                {roles.isAdmin && (
                  <NavDropdown title="관리" id="admin-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/adminReservation">예약 관리</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/adminUser">유저 관리</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/adminPartner">파트너 관리</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
                  </NavDropdown>
                )}
                {roles.isPartner && !roles.isAdmin && (
                  <NavDropdown title="마이페이지" id="partner-dropdown">
                    <NavDropdown.Item as={Link} to="/partner/partnerMypage">내 정보 변경</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/partner/partnerReservation">내 예약 보기</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/partner/partnerReview">내 리뷰 보기</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/partner/partnerChatRoom">채팅 내역</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
                  </NavDropdown>
                )}
                {roles.isUser && !roles.isAdmin && !roles.isPartner && (
                  <NavDropdown title="마이페이지" id="user-dropdown">
                    <NavDropdown.Item as={Link} to="/user/userMypage">내 정보 변경</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/user/userReservation">내 예약 보기</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/user/userReview">리뷰 작성</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/user/userChatRoom">채팅 내역</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/user/userPartner">파트너 신청</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/user/userCart">장바구니</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
                  </NavDropdown>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
