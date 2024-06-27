
package com.finder.project.resume.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finder.project.resume.dto.EmploymentHistory;
import com.finder.project.resume.mapper.EmploymentHistoryMapper;

import lombok.extern.slf4j.Slf4j;



@Slf4j
@Service
public class EmploymentHistoryServiceImpl implements EmploymentHistoryService {
    @Autowired
    private EmploymentHistoryMapper employmentHistoryMapper;
    
    
    @Override
    public List<EmploymentHistory> employmentHistoryList(int cvNo) throws Exception {
        List<EmploymentHistory> employmentHistoryList = employmentHistoryMapper.listByCvNo(cvNo);
        return employmentHistoryList; 
    }

    
    @Override
    public EmploymentHistory select(int employmentHistoryNo) throws Exception {
        EmploymentHistory employmentHistory = employmentHistoryMapper.select(employmentHistoryNo);
        return employmentHistory;
    }


    @Override
    public int create(EmploymentHistory employmentHistory) throws Exception {
        int result = employmentHistoryMapper.create(employmentHistory);
        return result;
    }
    
    @Override
    public int update(EmploymentHistory employmentHistory) throws Exception {
        int result = employmentHistoryMapper.update(employmentHistory);
        return result;
    }


    @Override
    public int delete(int employmentHistoryNo) throws Exception {
        int result = employmentHistoryMapper.delete(employmentHistoryNo);
        return result;
    }
    
    
    @Override
    public int maxPk() throws Exception {
        int result = employmentHistoryMapper.maxPk();
        return result;
    }
    
    
    @Override
    public int deleteByCvNo(int cvNo) throws Exception {
        int result = employmentHistoryMapper.deleteByCvNo(cvNo);
        return result;
    }
    
    
}
