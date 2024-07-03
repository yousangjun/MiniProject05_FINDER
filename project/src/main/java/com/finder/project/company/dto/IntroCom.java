package com.finder.project.company.dto;

import lombok.Data;
/* introduce에 사용할 dto 추가 */
@Data
public class IntroCom {
    private String comName;
    private String comCategory;
    private String comAddress;
    private int comBirth;
    private int comEmpCount;
    private int comSales;
    private String comSize;
    private String comRepresent;
    private String comContent;


    public String getComName() {
        return this.comName;
    }

    public void setComName(String comName) {
        this.comName = comName;
    }

    public String getComCategory() {
        return this.comCategory;
    }

    public void setComCategory(String comCategory) {
        this.comCategory = comCategory;
    }

    public String getComAddress() {
        return this.comAddress;
    }

    public void setComAddress(String comAddress) {
        this.comAddress = comAddress;
    }

    public int getComBirth() {
        return this.comBirth;
    }

    public void setComBirth(int comBirth) {
        this.comBirth = comBirth;
    }

    public int getComEmpCount() {
        return this.comEmpCount;
    }

    public void setComEmpCount(int comEmpCount) {
        this.comEmpCount = comEmpCount;
    }

    public int getComSales() {
        return this.comSales;
    }

    public void setComSales(int comSales) {
        this.comSales = comSales;
    }

    public String getComSize() {
        return this.comSize;
    }

    public void setComSize(String comSize) {
        this.comSize = comSize;
    }

    public String getComRepresent() {
        return this.comRepresent;
    }

    public void setComRepresent(String comRepresent) {
        this.comRepresent = comRepresent;
    }

    public String getComContent() {
        return this.comContent;
    }

    public void setComContent(String comContent) {
        this.comContent = comContent;
    }

    
}
