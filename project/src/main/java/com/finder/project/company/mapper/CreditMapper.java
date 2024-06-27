package com.finder.project.company.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.finder.project.company.dto.Credit;
import com.finder.project.company.dto.Order;
import com.finder.project.company.dto.Product;
import com.finder.project.main.dto.Page;

@Mapper
public interface CreditMapper {
    
    // 상품 조회
    public Product selectProduct(int productNo) throws Exception;
  
    // 주문 조회
    public Order selectOrder(int orderNo) throws Exception;

    // 결제 조회
    public Credit selectCredit(int orderNo) throws Exception;
    
    // 주문/결제 목록 조회 (조인)
    public List<Order> orderCreditList(@Param("userNo") int userNo, @Param("page") Page page
                                      ) throws Exception;
    // 주문내역 페이지 당 개수
    public int countOrderCredit(int userNo) throws Exception;
                                    



    // 주문등록
    public int insertOrder(Order order) throws Exception;

    // 결제등록
    public int insertCredit(Credit credit) throws Exception;

    // 결제완료 후 주문테이블 수정
    public int updateOrder(Order order) throws Exception;

    // 채용공고 등록 후 퀀티티 1감소
    public int updateRemainQuantityByOrderNo(Order order);

    // 채용공고 등록 후 퀀티티 0 일때 엑세스 0으로 감소
    public int updateRemainQuantityAndAccessOrderByOrderNo(Order order);


}
