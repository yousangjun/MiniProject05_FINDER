package com.finder.project.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 검색 옵션
 * -keyword : 검색어
 * -code : 옵션코드
 * 검색 옵션
 * 전체 : 0
 * 제목 : 1
 * 내용 : 2
 * 제목 + 내용 : 3
 * 작성자 : 4
 */
@Data
@AllArgsConstructor
public class Option {
    Integer code;
    String keyword;

    // public Option() {
    //     this.keyword = "";
    // }

    

}
