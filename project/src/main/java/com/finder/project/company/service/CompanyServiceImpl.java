package com.finder.project.company.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.finder.project.company.dto.Company;
import com.finder.project.company.dto.CompanyDetail;
import com.finder.project.company.dto.Credit;
import com.finder.project.company.dto.Order;
import com.finder.project.company.dto.Product;
import com.finder.project.company.mapper.CompanyMapper;
import com.finder.project.company.mapper.CreditMapper;
import com.finder.project.main.dto.Page;
import com.finder.project.recruit.service.RecruitService;
import com.finder.project.user.dto.Users;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyMapper companyMapper;
    @Autowired
    private CreditMapper creditMapper;
    @Autowired
    private RecruitService recruitService;


    // 기업 상세 정보 조회 (기업 소개)
    @Override
    public CompanyDetail selectCompanyDetail(int no) throws Exception {
        CompanyDetail companyDetail = companyMapper.selectCompanyDetail(no);
        return companyDetail;
    }
    // 기업 상세 정보 등록 (기업 소개)
    @Override
    public int insertCompanyDetail(CompanyDetail companyDetail) throws Exception {
        int result = companyMapper.insertCompanyDetail(companyDetail);

        return result;
    }
    // 기업 상세 정보 수정 (기업 소개)
    @Override
    public int updateCompanyDetail(CompanyDetail companyDetail) throws Exception {
        int result = companyMapper.updateCompanyDetail(companyDetail);

        return result;
    }




    // 기업 정보 조회 (기업 정보)
    @Override
    public Company selectCompanyByComNo(int no) throws Exception {
        Company company = companyMapper.selectCompanyByComNo(no);
        return company;
    }
    // 기업 정보 등록 (기업 정보)
    @Override
    public int insertCompany(Company company) throws Exception {
        int result = companyMapper.insertCompany(company);
        return result;
    }
    // 기업회원 정보 수정 (기업 정보)
    @Transactional
    @Override
    public int updateUserInfo(Users user) throws Exception {
        int updateUserInfo = companyMapper.updateUserInfo(user);
        // int resultCompany = companyMapper.updateCompanyAddress(company);
        return updateUserInfo;
    }



    // 비밀번호 변경
    @Override
    public int updateUserPw(Users user) throws Exception {
        int result = companyMapper.updateUserPw(user);
        return result;
    }

    




    // 쌤이랑 한거 userNo로 company 가져오기, comNo 으로 companyDetail 가져오기
    @Override
    public Company selectByUserNo(int userNo) {
        Company company = companyMapper.selectByUserNo(userNo);
        return company;
    }
    @Override
    public CompanyDetail selectCompanyDetailByComNo(int comNo) {
        CompanyDetail companyDetail = companyMapper.selectCompanyDetailByComNo(comNo);
        return companyDetail;
    }


    



    // 상품 조회
    @Override
    public Product selectProduct(int productNo) throws Exception {
        Product product = creditMapper.selectProduct(productNo);
        return product;
    }

    // 주문 조회
    @Override
    public Order selectOrder(int orderNo) throws Exception {
        Order order = creditMapper.selectOrder(orderNo);
        return order;
    }

    // 주문/결제 목록 조회(조인)
    @Override
    public List<Order> orderCreditList(int userNo, Page page) throws Exception {

        int total = creditMapper.countOrderCredit(userNo);
        page.setTotal(total);

        List<Order> orderCreditList = creditMapper.orderCreditList(userNo, page);
        return orderCreditList;
    }

    // 결제 조회 
    @Override
    public Credit selectCredit(int orderNo) throws Exception {
        Credit credit = creditMapper.selectCredit(orderNo);
        return credit;
    }



    // 주문 등록
    @Override
    public int insertOrder(Order order) throws Exception {
        // 주문내역에 넣으면서 주문 번호 반환
        creditMapper.insertOrder(order);
        return order.getOrderNo();
    }
    // 결제 등록
    @Override
    public int insertCredit(Credit credit) throws Exception {
        int result = creditMapper.insertCredit(credit);
        return result;
    }

    // 결제완료 후 주문테이블 수정
    @Override
    public int updateOrder(Order order) throws Exception {
        int result = creditMapper.updateOrder(order);
        return result;
    }
    @Override
    public List<Company> serachCompanyByName(String name) throws Exception {
        List<Company> companies = companyMapper.serachCompanyByName(name);

        // for (Company company : companies) {
        //     int comNo = company.getComNo();
        //     List<RecruitPost> recruitPosts = recruitService.postsRecruitListKeyword(comNo);
        //     company.setRecruitList(recruitPosts);
        // }

        return companies;
    }







}
