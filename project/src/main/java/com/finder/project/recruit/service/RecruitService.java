package com.finder.project.recruit.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.finder.project.company.dto.Company;
import com.finder.project.company.dto.CompanyDetail;
import com.finder.project.company.dto.Order;
import com.finder.project.main.dto.Option;
import com.finder.project.main.dto.Page;
import com.finder.project.recruit.dto.RecruitPage;
import com.finder.project.recruit.dto.RecruitPost;
import com.finder.project.resume.dto.Resume;

/**
 * RecruitService
 */

public interface RecruitService {

    // 채용공고 목록
    public List<RecruitPost> recruitList(RecruitPage pageRequest, Option option) throws Exception;

    // 채용공고 등록
    public int recruitPost(RecruitPost recruitPost) throws Exception;

    public int recruitUpdate(RecruitPost recruitPost) throws Exception;

    // 채용공고 상세조회
    public RecruitPost recruitRead(int recruitNo) throws Exception;

    // public List<Keyword> recruitReadKeyword(int recruitNo) throws Exception;
    public CompanyDetail selectCompanyDetailsWithRecruit(int comNo) throws Exception;


    // 등록 한 채용공고 목록
    public List<RecruitPost> postsRecruitList(int comNo) throws Exception;

    // 등록 한 채용공고 목록 페이징용 [승헌]
    public List<RecruitPost> pagedPostsRecruitList(int comNo, Page page) throws Exception;

    // 등록 한 채용공고 삭제
    public int deleteRecruitList(int recruitNo) throws Exception;

    // 등록 한 채용공고 조회
    public RecruitPost postsRecruitRead(int recruitNo) throws Exception;

    // 등록 한 채용공고 키워드 삭제 후 수정
    public int updateRecruitRead(RecruitPost recruitPost) throws Exception;

    public List<RecruitPost> selectRecruitsByNos(List<Integer> recruitNos);

    public List<String> selectCompanyNameList();

    // 비동기 이력서 삭제
    public int deleteCvList(int cvNo) throws Exception;

    // 지원
    public int apply(int recruitNo, int cvNo) throws Exception;

    // 지원한 이력서list
    public List<RecruitPost> applyCvList(int userNo) throws Exception;

    // 제출된 이력서
    public List<Resume> applyCom(int comNo, Page page) throws Exception;

    // userNo 으로 com
    public Company userNoToCom(int userNo) throws Exception;

    // recruit에 comNo으로 com
    public Company recruitToCom(int comNo) throws Exception;

    // recruitNo 으로 recruit
    public RecruitPost recruitNoToRecruit(int recruitNo) throws Exception;

    // userNo으로 현재 recruit에 user의 ae count
    public int userNoToDistnctRecruitNo(@Param("userNo") int userNo, @Param("recruitNo") int recruitNo)
            throws Exception;

    public Order selectOrdersByUserNo(int userNo);

    // 메인 검색
    public List<RecruitPost> postsRecruitListKeyword(int comNo);

    // 채용공고 등록 후 퀀티티 1감소
    public int updateRemainQuantityByOrderNo(Order order);

    // 채용공고 등록 후 퀀티티 0 일때 엑세스 0으로 감소
    public int updateRemainQuantityAndAccessOrderByOrderNo(Order order);

    public int getCheckByRecruitNo(int recruitNo, int userNo);
}