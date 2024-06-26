package com.finder.project.company.dto;

import lombok.Data;

@Data
public class Product {
    
    private int productNo;
    private String productName;
    private int productCount;
    private int productPrice;
    private int productDuration;    // 그냥 상품기간 (개월수 ex) 1개월 = 1)
    
}
