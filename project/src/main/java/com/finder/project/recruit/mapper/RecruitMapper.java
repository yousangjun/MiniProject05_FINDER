package com.finder.project.recruit.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.finder.project.company.dto.Company;
import com.finder.project.company.dto.CompanyDetail;
import com.finder.project.company.dto.Order;
import com.finder.project.main.dto.Option;
import com.finder.project.main.dto.Page;
import com.finder.project.recruit.dto.Keyword;
import com.finder.project.recruit.dto.RecruitPage;
import com.finder.project.recruit.dto.RecruitPost;
import com.finder.project.resume.dto.Resume;

@Mapper
public interface RecruitMapper {

    // 채용공고 목록
    public List<RecruitPost> recruitList(@Param("page") RecruitPage page, @Param("option") Option option) throws Exception;

    // 채용공고 등록
    public int recruitPost(RecruitPost recruitPost) throws Exception;

    public int recruitUpdate(RecruitPost recruitPost) throws Exception;

    // keyword
    public int max() throws Exception;
    // public int recruitKeyword(@Param("recruitNo") int recruitNo, @Param("recruitKeyword") String keyword);
    public int recruitKeyword(Keyword keyword) throws Exception;
    // keyword 끝

    // 채용공고 상세조회
    public RecruitPost recruitRead(int recruitNo) throws Exception;
    // public List<Keyword> recruitReadKeyword(int recruitNo) throws Exception;
    // 채용공고 회사정보
    public CompanyDetail selectCompanyDetailsWithRecruit(int comNo) throws Exception;

    // 등록 한 채용공고 목록
    public List<RecruitPost> postsRecruitList(int comNo) throws Exception;
    // 등록 한 채용공고 목록 페이징용 [승헌]
    public List<RecruitPost> pagedPostsRecruitList(@Param("comNo") int comNo, @Param("page") Page page) throws Exception;
    // 등록 한 채용공고 목록 페이지당 개수 [승헌]
    public int countpostsRecruitList(int comNo) throws Exception;

    // 등록 한 채용공고 삭제
    public int deleteRecruitList(int recruitNo) throws Exception;

    // 등록 한 채용공고 조회
    public RecruitPost postsRecruitRead(int recruitNo) throws Exception;

    // 등록 한 채용공고 수정
    public int updateRecruitRead(RecruitPost recruitPost) throws Exception;

    // 키워드 삭제
    public int deleteKeyword(int recruitNo) throws Exception;
    
    // 키워드 삭제 후 등록 할 때
    public int recruitKeyword(int recruitNo, String recruitKeyword);

    
    public List<RecruitPost> selectRecruitsByNos(List<Integer> recruitNos);
    
    // 연관검색
    public List<String> selectCompanyNameList();

    // 공고 갯수
    public int count(@Param("option") Option option);

    // 지원
    public int apply(@Param("recruitNo") int recruitNo, @Param("cvNo") int cvNo) throws Exception;

    public List<RecruitPost> applyCvList(int userNo) throws Exception;


    // 제출된 이력서 내역
    public List<Resume> applyCom(@Param("comNo") int comNo, @Param("page") Page page) throws Exception;
    // 제출된 이력서 페이징 게시물 개수
    public int countResumes(@Param("comNo") int comNo) throws Exception;


    public Company userNoToCom(int userNo) throws Exception;

    public Company recruitToCom(int comNo) throws Exception;

    public RecruitPost recruitNoToRecruit(int recruitNo) throws Exception;

    public int userNoToDistnctRecruitNo(@Param("userNo") int userNo, @Param("recruitNo") int recruitNo);

    public Order selectOrdersByUserNo(int userNo);

    public List<RecruitPost> postsRecruitListKeyword(int comNo);

    // 채용공고 등록 후 퀀티티 1감소
    public int updateRemainQuantityByOrderNo(Order order);
    // 채용공고 등록 후 퀀티티 0 일때 엑세스 0으로 감소
    public int updateRemainQuantityAndAccessOrderByOrderNo(Order order);

    public int getCheckByRecruitNo(@Param("recruitNo") int recruitNo,@Param("userNo") int userNo);

}
