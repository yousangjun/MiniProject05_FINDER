package com.finder.project.recruit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.finder.project.company.dto.Company;
import com.finder.project.company.dto.CompanyDetail;
import com.finder.project.company.dto.Order;
import com.finder.project.company.mapper.CreditMapper;
import com.finder.project.main.dto.Files;
import com.finder.project.main.dto.Option;
import com.finder.project.main.dto.Page;
import com.finder.project.main.service.FileService;
import com.finder.project.recruit.dto.Keyword;
import com.finder.project.recruit.dto.RecruitPage;
import com.finder.project.recruit.dto.RecruitPost;
import com.finder.project.recruit.mapper.RecruitMapper;
import com.finder.project.resume.dto.Resume;
import com.finder.project.resume.mapper.ResumeMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RecruitServiceImpl implements RecruitService {

    @Autowired
    RecruitMapper recruitMapper;

    @Autowired
    ResumeMapper resumeMapper;

    @Autowired
    FileService fileService;

    @Autowired
    CreditMapper creditMapper;

    // 채용공고 List
    @Override
    public List<RecruitPost> recruitList(RecruitPage page, Option option) throws Exception {

        List<RecruitPost> recruitList = recruitMapper.recruitList(page, option);

        return recruitList;
    }

    // 채용공고 등록 & keyword 등록
    @Override
    public int recruitPost(RecruitPost recruitPost) throws Exception {

        int result = recruitMapper.recruitPost(recruitPost);
        int recruitNo = recruitMapper.max();

        if (recruitNo == 0)
            return 0;
        recruitPost.setRecruitNo(recruitNo);

        for (String keyword : recruitPost.getKeyword()) {
            Keyword k = new Keyword();
            k.setRecruitKeyword(keyword);
            k.setRecruitNo(recruitNo);
            recruitMapper.recruitKeyword(k);
        }

        String parentTable = "recruit";
        int parentNo = recruitMapper.max();

        System.out.println("겟파일 " + recruitPost.getFile());
        System.out.println("겟파일 " + recruitPost.getThumbnail());
        // 썸네일 업로드
        // - 부모테이블, 부모번호, 멀티파트파일, 파일코드:1(썸네일)
        MultipartFile thumbnailFile = recruitPost.getThumbnail();
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {

            Files thumbnail = new Files();
            thumbnail.setFile(thumbnailFile);
            thumbnail.setParentTable(parentTable);
            thumbnail.setParentNo(parentNo);
            thumbnail.setFileCode(1);

            fileService.upload(thumbnail); // 썸네일 파일 업로드
        }

        // 첨부파일 업로드
        List<MultipartFile> fileList = recruitPost.getFile();
        if (fileList != null && !fileList.isEmpty()) {
            for (MultipartFile file : fileList) {
                if (file.isEmpty())
                    continue;

                // 파일 정보 등록
                Files uploadFile = new Files();
                uploadFile.setParentTable(parentTable);
                uploadFile.setParentNo(parentNo);
                uploadFile.setFile(file);

                fileService.upload(uploadFile);

            }
        }

        return result;
    }

    @Override
    public int recruitUpdate(RecruitPost recruitPost) throws Exception {

        int result = recruitMapper.recruitUpdate(recruitPost);
        int recruitNo = recruitPost.getRecruitNo();

        log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + recruitNo);
        if (recruitNo == 0)
            return 0;

        for (String keyword : recruitPost.getKeyword()) {
            Keyword k = new Keyword();
            k.setRecruitKeyword(keyword);
            k.setRecruitNo(recruitNo);
            recruitMapper.recruitKeyword(k);
        }

        String parentTable = "recruit";
        int parentNo = recruitNo;

        System.out.println("겟파일 " + recruitPost.getFile());
        System.out.println("겟파일 " + recruitPost.getThumbnail());
        // 썸네일 업로드
        // - 부모테이블, 부모번호, 멀티파트파일, 파일코드:1(썸네일)
        MultipartFile thumbnailFile = recruitPost.getThumbnail();
        if (thumbnailFile != null && !thumbnailFile.isEmpty()) {

            Files thumbnail = new Files();
            thumbnail.setFile(thumbnailFile);
            thumbnail.setParentTable(parentTable);
            thumbnail.setParentNo(parentNo);
            thumbnail.setFileCode(1);

            fileService.upload(thumbnail); // 썸네일 파일 업로드
        }

        // 첨부파일 업로드
        List<MultipartFile> fileList = recruitPost.getFile();
        if (fileList != null && !fileList.isEmpty()) {
            for (MultipartFile file : fileList) {
                if (file.isEmpty())
                    continue;

                // 파일 정보 등록
                Files uploadFile = new Files();
                uploadFile.setParentTable(parentTable);
                uploadFile.setParentNo(parentNo);
                uploadFile.setFile(file);

                fileService.upload(uploadFile);

            }
        }

        return result;
    }

    // 채용공고 상세조회
    @Override
    public RecruitPost recruitRead(int recruitNo) throws Exception {
        RecruitPost recruitPost = recruitMapper.recruitRead(recruitNo);

        return recruitPost;
    }
    // 채용공고 상세조회 끝

    // 등록 한 채용공고 목록
    @Override
    public List<RecruitPost> postsRecruitList(int comNo) throws Exception {

        List<RecruitPost> postsRecruitList = recruitMapper.postsRecruitList(comNo);

        return postsRecruitList;
    }

    // 등록 한 채용공고 목록 페이징용 [승헌]
    @Override
    public List<RecruitPost> pagedPostsRecruitList(int comNo, Page page) throws Exception {
        int total = recruitMapper.countpostsRecruitList(comNo);
        page.setTotal(total);

        List<RecruitPost> postsRecruitList = recruitMapper.pagedPostsRecruitList(comNo, page);

        return postsRecruitList;
    }

    // 등록 한 채용공고 조회
    @Override
    public RecruitPost postsRecruitRead(int recruitNo) throws Exception {
        RecruitPost recruitPost = recruitMapper.postsRecruitRead(recruitNo);
        return recruitPost;
    }

    @Override
    public int deleteRecruitList(int recruitNo) throws Exception {
        int result = recruitMapper.deleteRecruitList(recruitNo);

        return result;
    }

    // 등록 한 채용공고 키워드 삭제 후 수정
    @Override
    public int updateRecruitRead(RecruitPost recruitPost) throws Exception {
        int recruitNo = recruitPost.getRecruitNo();

        int result2 = recruitMapper.deleteKeyword(recruitNo);
        if (result2 > 0) {
            log.info("keyword 삭제성공");
        }
        for (String keyword : recruitPost.getKeyword()) {
            Keyword k = new Keyword();
            k.setRecruitKeyword(keyword);
            k.setRecruitNo(recruitNo);
            recruitMapper.recruitKeyword(k);
        }

        int result = recruitMapper.updateRecruitRead(recruitPost);

        return result;
    }

    @Override
    public List<RecruitPost> selectRecruitsByNos(List<Integer> recruitNos) {
        return recruitMapper.selectRecruitsByNos(new ArrayList<>(recruitNos));
    }

    // 연관검색
    @Override
    public List<String> selectCompanyNameList() {
        return recruitMapper.selectCompanyNameList();
    }

    @Override
    public int deleteCvList(int cvNo) throws Exception {
        return resumeMapper.delete(cvNo);
    }

    // 지원
    @Override
    public int apply(int recruitNo, int cvNo) throws Exception {
        return recruitMapper.apply(recruitNo, cvNo);
    }

    @Override
    public List<RecruitPost> applyCvList(int userNo) throws Exception {
        return recruitMapper.applyCvList(userNo);
    }

    @Override
    public List<Resume> applyCom(int comNo, Page page) throws Exception {

        int total = recruitMapper.countResumes(comNo);
        page.setTotal(total);

        return recruitMapper.applyCom(comNo, page);
    }

    @Override
    public Company userNoToCom(int userNo) throws Exception {
        return recruitMapper.userNoToCom(userNo);
    }

    @Override
    public CompanyDetail selectCompanyDetailsWithRecruit(int comNo) throws Exception {
        return recruitMapper.selectCompanyDetailsWithRecruit(comNo);
    }

    @Override
    public Company recruitToCom(int comNo) throws Exception {
        return recruitMapper.recruitToCom(comNo);
    }

    @Override
    public RecruitPost recruitNoToRecruit(int recruitNo) throws Exception {

        return recruitMapper.recruitNoToRecruit(recruitNo);
    }

    @Override
    public int userNoToDistnctRecruitNo(int userNo, int recruitNo) {

        return recruitMapper.userNoToDistnctRecruitNo(userNo, recruitNo);
    }

    @Override
    public Order selectOrdersByUserNo(int userNo) {

        return recruitMapper.selectOrdersByUserNo(userNo);
    }

    @Override
    public List<RecruitPost> postsRecruitListKeyword(int comNo) {

        return recruitMapper.postsRecruitListKeyword(comNo);
    }

    @Override
    public int updateRemainQuantityByOrderNo(Order order) {
        return creditMapper.updateRemainQuantityByOrderNo(order);
    }

    @Override
    public int updateRemainQuantityAndAccessOrderByOrderNo(Order order) {
        return creditMapper.updateRemainQuantityAndAccessOrderByOrderNo(order);
    }

    @Override
    public int getCheckByRecruitNo(int recruitNo, int userNo) {

        return recruitMapper.getCheckByRecruitNo(recruitNo, userNo);
    }

}
