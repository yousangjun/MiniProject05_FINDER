package com.finder.project.company.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.finder.project.company.dto.Company;
import com.finder.project.company.dto.CompanyDetail;
import com.finder.project.user.dto.Users;

@Mapper
public interface CompanyMapper {


    // 기업 상세 정보 조회 (기업 소개) ❌
    public CompanyDetail selectCompanyDetail(int comInfoNo) throws Exception;

    // 기업 상세 정보 등록 (기업 소개) ⭕
    public int insertCompanyDetail(CompanyDetail companyDetail) throws Exception;

    // 기업 상세 정보 수정 (기업 소개) ⭕
    public int updateCompanyDetail(CompanyDetail companyDetail) throws Exception;

    // 기업 상세 정보 삭제는 없음 (기업 소개)

    




    // 기업 정보 조회 ❌
    public Company selectCompanyByComNo(int comNo) throws Exception;
    // 기업 정보 등록 ❌
    public int insertCompany(Company company) throws Exception;


    // 기업회원 정보 수정 (기업 정보) ⭕
    public int updateUserInfo(Users user) throws Exception;
    // 기업 주소 수정 (기업 정보) ⭕
    // public int updateCompanyAddress(Company company) throws Exception;

    // 기업 정보 삭제는 없음 (기업 정보)


    // 유저 비밀번호 변경
    public int updateUserPw(Users user) throws Exception;



    // 유저번호로 기업 조회 ⭕
    public Company selectByUserNo(int userNo);   
    // 기업번호로 기업상세 조회 ⭕
    public CompanyDetail selectCompanyDetailByComNo(int comNo);
 

    // 회사 검색
    public List<Company> serachCompanyByName(String name) throws Exception;




    
}

