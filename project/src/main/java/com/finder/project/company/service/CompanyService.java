package com.finder.project.company.service;

import java.util.List;

import com.finder.project.company.dto.Company;
import com.finder.project.company.dto.CompanyDetail;
import com.finder.project.company.dto.Credit;
import com.finder.project.company.dto.Order;
import com.finder.project.company.dto.Product;
import com.finder.project.main.dto.Page;
import com.finder.project.user.dto.Users;

public interface CompanyService {

    // 기업 상세 정보 조회 (기업 소개)
    public CompanyDetail selectCompanyDetail(int comInfoNo) throws Exception;
    // 기업 상세 정보 등록 (기업 소개)
    public int insertCompanyDetail(CompanyDetail companyDetail) throws Exception;
    // 기업 상세 정보 수정 (기업 소개)
    public int updateCompanyDetail(CompanyDetail companyDetail) throws Exception;

 

    // 기업 정보 조회 (기업 정보)
    public Company selectCompanyByComNo(int comNo) throws Exception;
    // 기업 정보 등록 (기업 정보)
    public int insertCompany(Company company) throws Exception;
    // 기업회원 정보 수정 (기업 정보)
    public int updateUserInfo(Users user) throws Exception;



    // 유저 비밀번호 변경
    public int updateUserPw(Users user) throws Exception;


    // 유저번호로 기업 조회
    public Company selectByUserNo(int userNo);   
    // 기업번호로 기업상세 조회
    public CompanyDetail selectCompanyDetailByComNo(int comNo);



    // 상품 조회
    public Product selectProduct(int productNo) throws Exception;
    // 주문 조회
    public Order selectOrder(int orderNo) throws Exception;
    // 결제 조회
    public Credit selectCredit(int orderNo) throws Exception;

    // 주문/결제 목록 조회 (조인)
    public List<Order> orderCreditList(int userNo, Page page) throws Exception;
    // 주문등록
    public int insertOrder(Order order) throws Exception;
    // 결제등록
    public int insertCredit(Credit credit) throws Exception;

    // 결제완료 후 주문테이블 수정
    public int updateOrder(Order order) throws Exception;

    // 회사 검색
    public List<Company> serachCompanyByName(String name) throws Exception;
}
