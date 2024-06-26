package com.finder.project.company.dto;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import com.finder.project.user.dto.Users;

import lombok.Data;

@Data
public class Order {
    
    private int orderNo;
    private int userNo;
    private int productNo;
    private int totalQuantity;
    private int totalPrice;
    private String orderStatus;
    private Timestamp orderedDate;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private Date expirationDate;
    private int remainQuantity;
    private int accessOrder;   // 주문 접근 1이면 접근 불가, 0이면 접근 가능 remainQuantity 가 0이면 0으로 바꿔준다.
    
    private Users user;

    private List<Credit> credits;

}
