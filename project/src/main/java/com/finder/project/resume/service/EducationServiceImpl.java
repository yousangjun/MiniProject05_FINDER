package com.finder.project.resume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finder.project.resume.dto.Education;
import com.finder.project.resume.mapper.EducationMapper;

@Service
public class EducationServiceImpl implements EducationService {
    @Autowired
    private EducationMapper educationMapper;

    @Override
    public List<Education> educationList(int cvNo) throws Exception {
        List<Education> educationList = educationMapper.listByCvNo(cvNo);
        return educationList;
    }

    @Override
    public Education select(int educationNo) throws Exception {
        Education education = educationMapper.select(educationNo);
        return education;
    }

    // 만들기
    @Override
    public int create(Education education) throws Exception {
        int result = educationMapper.create(education);
        return result;
    }

    @Override
    public int update(Education education) throws Exception {
        int result = educationMapper.update(education);
        return result;
    }

    @Override
    public int delete(int educationNo) throws Exception {
        int result = educationMapper.delete(educationNo);
        return result;
    }
    
    @Override
    public int maxPk() throws Exception {
        int result = educationMapper.maxPk();
        return result;
    }
    
    @Override
    public int deleteByCvNo(int cvNo) throws Exception {
        int result = educationMapper.deleteByCvNo(cvNo);
        return result;
    }


    
}
