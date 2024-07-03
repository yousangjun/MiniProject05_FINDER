package com.finder.project.company.dto;

import lombok.Data;

@Data
public class OrderCreditDTO {

    private String orderId;
    private int amount;
    private String paymentKey;
    private int productNo;
    private int orderNo;

}
